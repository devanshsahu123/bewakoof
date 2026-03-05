"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import {
  HiOutlineMapPin,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiChevronRight,
  HiCheck,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineHome,
  HiMiniQrCode,
  HiOutlineReceiptPercent,
  HiChevronDown,
  HiChevronUp,
  HiPlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineTag,
  HiXMark,
} from "react-icons/hi2";

/* ─────────────────────────────────────────────
   Constants & types
───────────────────────────────────────────── */
const FREE_SHIPPING_THRESHOLD = 599;

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  flat: string;
  area: string;
  city: string;
  district: string;
  state: string;
  country: string;
  tag: "Home" | "Work" | "Other";
}

type Step = "address" | "payment" | "success";
type PaymentMethod = "cod" | "upi" | "card";

/* ─────────────────────────────────────────────
   Step Indicator
───────────────────────────────────────────── */
function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { id: "address", label: "Address", icon: <HiOutlineMapPin size={16} /> },
    { id: "payment", label: "Payment", icon: <HiOutlineCreditCard size={16} /> },
    { id: "success", label: "Confirm", icon: <HiOutlineCheckCircle size={16} /> },
  ] as const;
  const idx = steps.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2"
                style={
                  done
                    ? { background: "linear-gradient(135deg,#22c55e,#16a34a)", borderColor: "#16a34a", color: "#fff" }
                    : active
                    ? { background: "linear-gradient(135deg,#facc15,#fbbf24)", borderColor: "#f59e0b", color: "#1a1a1a" }
                    : { background: "#f3f4f6", borderColor: "#e5e7eb", color: "#9ca3af" }
                }
              >
                {done ? <HiCheck size={15} strokeWidth={2.5} /> : step.icon}
              </div>
              <span className="text-[10px] font-bold tracking-wide uppercase"
                style={{ color: active ? "#f59e0b" : done ? "#16a34a" : "#9ca3af" }}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-0.5 w-12 sm:w-24 mx-1 mb-4 rounded-full transition-all duration-500"
                style={{ background: done ? "linear-gradient(90deg,#22c55e,#16a34a)" : "#e5e7eb" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Input helpers
───────────────────────────────────────────── */
function Field({ label, icon, error, children }: {
  label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">{label}</label>
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-gray-400 pointer-events-none">{icon}</span>}
        {children}
      </div>
      {error && <p className="text-[11px] text-red-500 font-semibold">{error}</p>}
    </div>
  );
}

const inputCls = (icon?: boolean, error?: string) =>
  `w-full ${icon ? "pl-9" : "pl-3"} pr-3 py-2.5 text-sm border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all font-medium placeholder:font-normal ${
    error ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-yellow-400"
  }`;

/* ─────────────────────────────────────────────
   Address Form (inline — add / edit)
───────────────────────────────────────────── */
type PincodeStatus = "idle" | "loading" | "done" | "error";

interface AddressFormData {
  name: string; phone: string; pincode: string; flat: string;
  area: string; city: string; district: string; state: string;
  country: string; tag: "Home" | "Work" | "Other";
}

function AutoFilledBadge() {
  return (
    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full pointer-events-none">
      <HiCheck size={10} strokeWidth={3} /> Auto-filled
    </span>
  );
}

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<AddressFormData>;
  onSave: (data: AddressFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<AddressFormData>({
    name: "", phone: "", pincode: "", flat: "", area: "",
    city: "", district: "", state: "", country: "India", tag: "Home",
    ...initial,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormData, string>>>({});
  const [pincodeStatus, setPincodeStatus] = useState<PincodeStatus>(initial?.state ? "done" : "idle");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-fill on pincode change
  useEffect(() => {
    const pin = form.pincode;
    if (!/^\d{6}$/.test(pin)) {
      if (pincodeStatus === "done") {
        // reset auto-filled fields if pincode is cleared
        setForm((p) => ({ ...p, state: "", city: "", district: "" }));
        setPincodeStatus("idle");
      }
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setPincodeStatus("loading");
      setPincodeMsg("");
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();
        if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          setForm((p) => ({
            ...p,
            state: po.State || p.state,
            city: po.Division || po.District || p.city,
            district: po.District || p.district,
          }));
          setPincodeStatus("done");
          setPincodeMsg("");
          setErrors((e) => ({ ...e, pincode: undefined, state: undefined, city: undefined }));
        } else {
          setPincodeStatus("error");
          setPincodeMsg("Invalid pincode — city/state not found");
        }
      } catch {
        setPincodeStatus("error");
        setPincodeMsg("Could not fetch pincode details. Fill manually.");
      }
    }, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.pincode]);

  const set = (k: keyof AddressFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const autofilled = pincodeStatus === "done";

  const validate = () => {
    const e: Partial<Record<keyof AddressFormData, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit number";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter 6-digit pincode";
    if (!form.flat.trim()) e.flat = "Required";
    if (!form.area.trim()) e.area = "Required";
    if (!form.state.trim()) e.state = "Required — enter pincode first";
    if (!form.city.trim()) e.city = "Required — enter pincode first";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  };

  const tags: Array<"Home" | "Work" | "Other"> = ["Home", "Work", "Other"];

  const readonlyCls = "w-full pl-3 pr-24 py-2.5 text-sm border-2 border-emerald-200 rounded-xl bg-emerald-50 font-medium text-emerald-800 focus:outline-none cursor-default select-none";

  return (
    <div className="bg-yellow-50/60 border-2 border-yellow-200 rounded-2xl p-4 sm:p-5 space-y-4">
      {/* Tag selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 mr-1">Address Type</span>
        {tags.map((t) => (
          <button key={t} type="button" onClick={() => setForm((p) => ({ ...p, tag: t }))}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${
              form.tag === t ? "border-yellow-400 bg-yellow-400 text-gray-900" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
            }`}>
            {t === "Home" ? "🏠" : t === "Work" ? "💼" : "📍"} {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Full Name */}
        <Field label="Full Name *" icon={<HiOutlineUser size={14} />} error={errors.name}>
          <input value={form.name} onChange={set("name")} placeholder="e.g. Rahul Sharma" className={inputCls(true, errors.name)} />
        </Field>

        {/* Phone with +91 prefix */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">Phone *</label>
          <div className="flex gap-0">
            <div className="flex items-center justify-center px-3 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-sm font-bold text-gray-600 whitespace-nowrap select-none">
              🇮🇳 +91
            </div>
            <input
              value={form.phone}
              onChange={set("phone")}
              placeholder="10-digit number"
              maxLength={10}
              inputMode="numeric"
              className={`flex-1 min-w-0 pl-3 pr-3 py-2.5 text-sm border-2 rounded-r-xl bg-gray-50 focus:bg-white focus:outline-none transition-all font-medium placeholder:font-normal ${
                errors.phone ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-yellow-400"
              }`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-red-500 font-semibold">{errors.phone}</p>}
        </div>

        {/* Address Line 1 — full width */}
        <div className="sm:col-span-2">
          <Field label="Address Line 1 *" icon={<HiOutlineHome size={14} />} error={errors.flat}>
            <input value={form.flat} onChange={set("flat")} placeholder="Flat, House No., Building, Company, Apartment" className={inputCls(true, errors.flat)} />
          </Field>
        </div>

        {/* Address Line 2 / Area — full width */}
        <div className="sm:col-span-2">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 block mb-1">Address Line 2 *</label>
          <textarea
            value={form.area}
            onChange={set("area")}
            rows={2}
            placeholder="Area, Colony, Street, Sector, Village"
            className={`w-full px-3 py-2.5 text-sm border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all font-medium placeholder:font-normal resize-none ${
              errors.area ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-yellow-400"
            }`}
          />
          {errors.area && <p className="text-[11px] text-red-500 font-semibold mt-0.5">{errors.area}</p>}
        </div>

        {/* Pincode — triggers autofill */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">
            Pincode *
            {pincodeStatus === "loading" && (
              <span className="ml-2 text-yellow-600 normal-case font-semibold animate-pulse">Fetching…</span>
            )}
            {pincodeStatus === "done" && (
              <span className="ml-2 text-emerald-600 normal-case font-semibold">✓ State &amp; City auto-filled</span>
            )}
          </label>
          <input
            value={form.pincode}
            onChange={set("pincode")}
            placeholder="Enter 6-digit pincode"
            maxLength={6}
            inputMode="numeric"
            className={inputCls(false, errors.pincode || (pincodeStatus === "error" ? pincodeMsg : ""))}
          />
          {errors.pincode && <p className="text-[11px] text-red-500 font-semibold">{errors.pincode}</p>}
          {pincodeStatus === "error" && !errors.pincode && (
            <p className="text-[11px] text-orange-500 font-semibold">{pincodeMsg}</p>
          )}
        </div>

        {/* State — auto-filled, read-only */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">State</label>
          <div className="relative">
            <input
              value={form.state}
              onChange={autofilled ? undefined : set("state")}
              readOnly={autofilled}
              placeholder={autofilled ? "" : "Auto-filled from pincode"}
              className={autofilled ? readonlyCls : inputCls(false, errors.state)}
            />
            {autofilled && <AutoFilledBadge />}
          </div>
          {errors.state && !autofilled && <p className="text-[11px] text-red-500 font-semibold">{errors.state}</p>}
        </div>

        {/* City — auto-filled, read-only */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">City</label>
          <div className="relative">
            <input
              value={form.city}
              onChange={autofilled ? undefined : set("city")}
              readOnly={autofilled}
              placeholder={autofilled ? "" : "Auto-filled from pincode"}
              className={autofilled ? readonlyCls : inputCls(false, errors.city)}
            />
            {autofilled && <AutoFilledBadge />}
          </div>
          {errors.city && !autofilled && <p className="text-[11px] text-red-500 font-semibold">{errors.city}</p>}
        </div>

        {/* District — auto-filled, read-only */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">District</label>
          <div className="relative">
            <input
              value={form.district}
              onChange={autofilled ? undefined : set("district")}
              readOnly={autofilled}
              placeholder="Auto-filled from pincode"
              className={autofilled && form.district ? readonlyCls : inputCls(false)}
            />
            {autofilled && form.district && <AutoFilledBadge />}
          </div>
        </div>

        {/* Country — fixed dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500">Country</label>
          <select
            value={form.country}
            onChange={set("country")}
            className="w-full pl-3 pr-8 py-2.5 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all font-medium appearance-none focus:border-yellow-400"
          >
            <option value="India">🇮🇳 India</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={submit}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold uppercase tracking-widest text-gray-900 transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(90deg,#facc15,#fbbf24)", boxShadow: "0 4px 18px rgba(250,204,21,0.4)" }}
        >
          <HiCheck size={15} strokeWidth={2.5} />
          Save Address
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-3 rounded-xl text-sm font-bold border-2 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all flex items-center gap-1.5"
        >
          <HiXMark size={14} strokeWidth={2.5} />
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Single Address Card
───────────────────────────────────────────── */
function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: {
  address: SavedAddress;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const tagColors: Record<string, string> = {
    Home: "bg-blue-100 text-blue-700",
    Work: "bg-purple-100 text-purple-700",
    Other: "bg-gray-100 text-gray-600",
  };
  const tagIcon: Record<string, string> = { Home: "🏠", Work: "💼", Other: "📍" };

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl border-2 p-4 cursor-pointer transition-all duration-200 ${
        selected
          ? "border-yellow-400 bg-yellow-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      {/* Selected ring accent */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: "0 0 0 3px rgba(250,204,21,0.25)" }} />
      )}

      <div className="flex items-start gap-3">
        {/* Radio dot */}
        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          selected ? "border-yellow-500 bg-yellow-500" : "border-gray-300 bg-white"
        }`}>
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-extrabold text-gray-900">{address.name}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[address.tag]}`}>
              {tagIcon[address.tag]} {address.tag}
            </span>
          </div>
          <p className="text-xs text-gray-700 font-medium leading-relaxed">
            {address.flat}, {address.area}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {address.city}{address.district ? `, ${address.district}` : ""}, {address.state} — {address.pincode}
          </p>
          <p className="text-[11px] text-gray-500 mt-1 font-medium flex items-center gap-1">
            <HiOutlinePhone size={11} /> {address.phone}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onEdit}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
          >
            <HiOutlinePencil size={13} />
          </button>
          <button
            onClick={onDelete}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
          >
            <HiOutlineTrash size={13} />
          </button>
        </div>
      </div>

      {/* "Deliver here" CTA — shown only when selected */}
      {selected && (
        <div className="mt-3 ml-8">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
            <HiCheck size={12} strokeWidth={2.5} /> Selected for delivery
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Address Step (main)
───────────────────────────────────────────── */
function AddressStep({ onNext }: { onNext: (addr: SavedAddress) => void }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noSelectError, setNoSelectError] = useState(false);

  const handleSave = (data: Omit<SavedAddress, "id">) => {
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...data, id: editingId } : a))
      );
      setEditingId(null);
    } else {
      const newAddr: SavedAddress = { ...data, id: Date.now().toString() };
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedId(newAddr.id);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleContinue = () => {
    const addr = addresses.find((a) => a.id === selectedId);
    if (!addr) { setNoSelectError(true); return; }
    setNoSelectError(false);
    onNext(addr);
  };

  const editingAddress = editingId ? addresses.find((a) => a.id === editingId) : undefined;

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            <HiOutlineMapPin size={20} className="text-yellow-500" />
            Delivery Address
          </h2>
          {addresses.length > 0 && !showForm && !editingId && (
            <button
              onClick={() => { setShowForm(true); setEditingId(null); }}
              className="flex items-center gap-1.5 text-[12px] font-bold text-yellow-700 bg-yellow-100 hover:bg-yellow-200 px-3 py-1.5 rounded-xl transition-all border border-yellow-200"
            >
              <HiPlus size={14} strokeWidth={2.5} />
              Add New Address
            </button>
          )}
        </div>

        {/* Saved address cards */}
        {addresses.length > 0 && (
          <div className="space-y-3 mb-4">
            {addresses.map((addr) =>
              editingId === addr.id ? (
                <AddressForm
                  key={addr.id}
                  initial={addr}
                  onSave={(data) => handleSave(data)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  selected={selectedId === addr.id}
                  onSelect={() => { setSelectedId(addr.id); setNoSelectError(false); }}
                  onEdit={() => { setEditingId(addr.id); setShowForm(false); }}
                  onDelete={() => handleDelete(addr.id)}
                />
              )
            )}
          </div>
        )}

        {/* Add new address form */}
        {showForm && !editingId && (
          <AddressForm
            onSave={(data) => handleSave(data)}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Empty state — no addresses yet */}
        {addresses.length === 0 && !showForm && (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mx-auto mb-3">
              <HiOutlineMapPin size={32} className="text-yellow-400" />
            </div>
            <p className="text-sm font-bold text-gray-700 mb-1">No saved addresses yet</p>
            <p className="text-xs text-gray-400 mb-4">Add an address below to continue</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-gray-900 transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg,#facc15,#fbbf24)", boxShadow: "0 4px 18px rgba(250,204,21,0.4)" }}
            >
              <HiPlus size={15} strokeWidth={2.5} />
              Add Address
            </button>
          </div>
        )}

        {/* Error */}
        {noSelectError && (
          <p className="text-[12px] text-red-500 font-semibold flex items-center gap-1 mt-2">
            <HiOutlineMapPin size={13} /> Please select a delivery address to continue
          </p>
        )}

        {/* Continue button */}
        {addresses.length > 0 && !showForm && !editingId && (
          <button
            onClick={handleContinue}
            className="mt-4 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-extrabold uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-gray-900"
            style={{
              background: "linear-gradient(90deg,#facc15 0%,#fbbf24 100%)",
              boxShadow: "0 6px 24px rgba(250,204,21,0.45), 0 0 0 1px rgba(250,204,21,0.2) inset",
            }}
          >
            Deliver to this Address
            <HiChevronRight size={17} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Payment helpers
───────────────────────────────────────────── */
function PaymentOption({ id, active, onClick, icon, title, subtitle, children }: {
  id: string; active: boolean; onClick: () => void;
  icon: React.ReactNode; title: string; subtitle: string; children?: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border-2 px-4 py-3.5 cursor-pointer transition-all duration-200 ${
        active ? "border-yellow-400 bg-yellow-50/60 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          active ? "border-yellow-500 bg-yellow-500" : "border-gray-300"
        }`}>
          {active && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
          {typeof icon === "string" ? <span>{icon}</span> : icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <p className="text-[11px] text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Payment Step
───────────────────────────────────────────── */
function PaymentStep({
  address, grandTotal, onBack, onPlace,
}: {
  address: SavedAddress; grandTotal: number; onBack: () => void; onPlace: () => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [upiError, setUpiError] = useState("");
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handlePlace = () => {
    if (method === "upi") {
      if (!upiId.includes("@")) { setUpiError("Enter a valid UPI ID (e.g. name@upi)"); return; }
      setUpiError("");
    }
    if (method === "card") {
      const e: Record<string, string> = {};
      if (card.number.replace(/\s/g, "").length !== 16) e.number = "Enter valid 16-digit number";
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "Enter MM/YY format";
      if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = "Enter 3–4 digit CVV";
      if (!card.name.trim()) e.name = "Required";
      if (Object.keys(e).length) { setCardErrors(e); return; }
      setCardErrors({});
    }
    onPlace();
  };

  const tagIcon: Record<string, string> = { Home: "🏠", Work: "💼", Other: "📍" };

  return (
    <div className="space-y-4">
      {/* Address recap */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
        <HiOutlineMapPin size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest mb-0.5">
            Delivering to {tagIcon[address.tag]} {address.tag}
          </p>
          <p className="text-sm font-bold text-gray-800">{address.name} · +91 {address.phone}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">
            {address.flat}, {address.area}, {address.city}, {address.state} — {address.pincode}
          </p>
        </div>
        <button onClick={onBack} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap">
          Change
        </button>
      </div>

      {/* Payment card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
          <HiOutlineCreditCard size={20} className="text-yellow-500" />
          Payment Method
        </h2>
        <div className="space-y-3">
          <PaymentOption id="cod" active={method === "cod"} onClick={() => setMethod("cod")}
            icon="💵" title="Cash on Delivery" subtitle="Pay when your order arrives" />
          <PaymentOption id="upi" active={method === "upi"} onClick={() => setMethod("upi")}
            icon={<HiMiniQrCode size={22} className="text-purple-600" />}
            title="UPI" subtitle="Google Pay, PhonePe, Paytm & more">
            {method === "upi" && (
              <div className="mt-3">
                <Field label="UPI ID" error={upiError}>
                  <input value={upiId} onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi" className={inputCls(false, upiError)} />
                </Field>
              </div>
            )}
          </PaymentOption>
          <PaymentOption id="card" active={method === "card"} onClick={() => setMethod("card")}
            icon={<HiOutlineCreditCard size={22} className="text-blue-600" />}
            title="Credit / Debit Card" subtitle="Visa, Mastercard, RuPay accepted">
            {method === "card" && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Field label="Card Number" error={cardErrors.number}>
                    <input value={card.number} onChange={(e) => setCard((p) => ({ ...p, number: formatCard(e.target.value) }))}
                      placeholder="1234 5678 9012 3456" inputMode="numeric" maxLength={19} className={inputCls(false, cardErrors.number)} />
                  </Field>
                </div>
                <Field label="Expiry (MM/YY)" error={cardErrors.expiry}>
                  <input value={card.expiry} onChange={(e) => setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY" maxLength={5} className={inputCls(false, cardErrors.expiry)} />
                </Field>
                <Field label="CVV" error={cardErrors.cvv}>
                  <input value={card.cvv} onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                    placeholder="•••" type="password" maxLength={4} inputMode="numeric" className={inputCls(false, cardErrors.cvv)} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Name on Card" error={cardErrors.name}>
                    <input value={card.name} onChange={(e) => setCard((p) => ({ ...p, name: e.target.value }))}
                      placeholder="As printed on card" className={inputCls(false, cardErrors.name)} />
                  </Field>
                </div>
              </div>
            )}
          </PaymentOption>
        </div>

        <button
          onClick={handlePlace}
          className="mt-6 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-extrabold uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-gray-900"
          style={{ background: "linear-gradient(90deg,#facc15 0%,#fbbf24 100%)", boxShadow: "0 6px 24px rgba(250,204,21,0.45), 0 0 0 1px rgba(250,204,21,0.2) inset" }}
        >
          <HiOutlineLockClosed size={16} strokeWidth={2.5} />
          Place Order · ₹{grandTotal.toLocaleString("en-IN")}
          <HiChevronRight size={16} strokeWidth={2.5} />
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1">
          <HiOutlineShieldCheck size={13} strokeWidth={2} />
          100% Secure &amp; Encrypted Payment
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Success Screen
───────────────────────────────────────────── */
function SuccessStep({ address }: { address: SavedAddress }) {
  const orderId = "BWK" + Math.random().toString(36).slice(2, 9).toUpperCase();
  const tagIcon: Record<string, string> = { Home: "🏠", Work: "💼", Other: "📍" };
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "radial-gradient(circle at 38% 40%, #86efac 0%, #4ade80 55%, #22c55e 100%)",
          boxShadow: "0 12px 40px rgba(34,197,94,0.4), 0 0 0 8px rgba(34,197,94,0.1)",
        }}
      >
        <HiCheck size={56} className="text-white" strokeWidth={1.8} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Order Placed! 🎉</h2>
      <p className="text-gray-500 text-sm mb-1 max-w-sm">
        Your order has been placed successfully. We&apos;ll send a confirmation to your registered number.
      </p>
      <p className="text-xs font-mono font-bold text-gray-400 mb-2">
        Order ID: <span className="text-gray-700">{orderId}</span>
      </p>
      <div className="mt-4 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-left w-full max-w-sm">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
          Delivering to {tagIcon[address.tag]} {address.tag}
        </p>
        <p className="text-sm font-bold text-gray-800">{address.name}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">
          {address.flat}, {address.area}<br />
          {address.city}{address.district ? `, ${address.district}` : ""}, {address.state} — {address.pincode}<br />
          📱 +91 {address.phone}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-3 w-full max-w-sm">
        <HiOutlineTruck size={18} className="text-emerald-600 flex-shrink-0" />
        <p className="text-sm font-semibold text-emerald-800">
          Expected delivery in <strong>3–5 business days</strong>
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold uppercase tracking-wide text-sm transition-all duration-200 text-gray-900 hover:-translate-y-0.5 hover:shadow-xl"
        style={{ background: "linear-gradient(90deg,#fbbf24 0%,#facc15 100%)", boxShadow: "0 6px 20px rgba(250,204,21,0.5)" }}
      >
        Continue Shopping <HiChevronRight size={16} strokeWidth={2.5} />
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Order Summary Sidebar
───────────────────────────────────────────── */
function OrderSummary({ collapsed, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const { cart } = useCart();
  const subTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const mrpTotal = cart.reduce((s, i) => s + i.mrp * i.quantity, 0);
  const totalDiscount = mrpTotal - subTotal;
  const shipping = subTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 79;
  const grandTotal = subTotal + shipping;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div
        className={`flex items-center justify-between px-4 py-3.5 border-b border-gray-50 ${onToggle ? "cursor-pointer" : ""}`}
        onClick={onToggle}
      >
        <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
          <HiOutlineReceiptPercent size={16} className="text-yellow-500" />
          Order Summary
          <span className="bg-yellow-100 text-yellow-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
        </h3>
        {onToggle && (collapsed ? <HiChevronDown size={16} className="text-gray-400" /> : <HiChevronUp size={16} className="text-gray-400" />)}
      </div>

      {!collapsed && (
        <>
          <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center gap-3 px-4 py-3">
                <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover object-top" sizes="56px" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-800 leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
          <div className="px-4 py-4 border-t border-gray-50 space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>MRP ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              <span className="font-medium text-gray-700">₹{mrpTotal.toLocaleString("en-IN")}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span className="font-bold">− ₹{totalDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500">
              <span>Delivery Charge</span>
              <span className={shipping === 0 ? "font-bold text-green-700" : "font-medium text-gray-700"}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            <div className="border-t-2 border-dashed border-gray-100 pt-3 flex justify-between">
              <span className="font-extrabold text-gray-900">Total Amount</span>
              <span className="font-black text-lg text-gray-900">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="bg-green-50 rounded-xl px-3 py-2 text-center">
                <p className="text-[12px] font-bold text-green-800">
                  🎉 You&apos;re saving <strong>₹{totalDiscount.toLocaleString("en-IN")}</strong> on this order!
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main CheckoutClient
───────────────────────────────────────────── */
export default function CheckoutClient() {
  const { cart } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const subTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 79;
  const grandTotal = subTotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <HiChevronRight size={12} />
          <Link href="/cart" className="hover:text-gray-700 transition-colors">Cart</Link>
          <HiChevronRight size={12} />
          <span className="text-gray-700 font-semibold">Checkout</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-6 lg:py-10">
        {step !== "success" && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-500 mt-1">
                {step === "address" ? "Step 1 of 2 — Select or add a delivery address" : "Step 2 of 2 — Choose payment method"}
              </p>
            </div>
            <StepIndicator current={step} />
          </div>
        )}

        {step === "success" ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SuccessStep address={selectedAddress!} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] gap-6 items-start">
            <div>
              {/* Mobile accordion summary */}
              <div className="lg:hidden mb-4">
                <OrderSummary collapsed={!summaryOpen} onToggle={() => setSummaryOpen((v) => !v)} />
              </div>
              {step === "address" && (
                <AddressStep
                  onNext={(addr) => { setSelectedAddress(addr); setStep("payment"); }}
                />
              )}
              {step === "payment" && selectedAddress && (
                <PaymentStep
                  address={selectedAddress}
                  grandTotal={grandTotal}
                  onBack={() => setStep("address")}
                  onPlace={() => setStep("success")}
                />
              )}
            </div>
            <div className="hidden lg:block lg:sticky lg:top-[84px]">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

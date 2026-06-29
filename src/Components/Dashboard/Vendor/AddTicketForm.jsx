"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  PlusCircle, Tag, MapPin, Bus,
  Layers, Calendar, Sparkles, Image as ImageIcon,
  User, Mail, Loader2, UploadCloud, CheckCircle2, AlertTriangle
} from "lucide-react";
import { addTicket } from "@/lib/actions/tickets";
import Image from "next/image";

export default function AddTicketForm() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const user = session?.user;

  // Form Processing States
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedPerks, setSelectedPerks] = useState([]);

  // Form Main Core States
  const [formData, setFormData] = useState({
    title: "",
    from: "",
    to: "",
    transportType: "bus",
    pricePerUnit: "",
    quantity: "",
    departureDateTime: "",
  });

  const perkOptions = [
    { id: "AC", label: "Air Conditioning (AC)" },
    { id: "Breakfast", label: "Complimentary Breakfast" },
    { id: "WiFi", label: "High-Speed Wi-Fi" },
    { id: "ChargingPort", label: "USB Charging Port" },
    { id: "Sleeper", label: "Luxury Sleeper Berth" }
  ];

  // Imgbb Client-side Upload System Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!imgbbApiKey) {
      toast.error(".env file-e env variable key setup kora nai!");
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: uploadData,
      });
      const result = await response.json();

      if (result.success) {
        setImageUrl(result.data.url);
        toast.success("Image uploaded successfully onto ImgBB!");
      } else {
        toast.error("Imgbb upload failed! API Response validation crashed.");
      }
    } catch (err) {
      console.error("Imgbb network exception pipeline stream:", err);
      toast.error("Network layer anomaly during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Checkbox state array sync handler (Double-firing bugs cleared)
  const handlePerkToggle = (perkId) => {
    setSelectedPerks((prev) =>
      prev.includes(perkId) ? prev.filter((item) => item !== perkId) : [...prev, perkId]
    );
  };

  // submit form handler server side call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.warn("Please upload an image asset first!");
      return;
    }

    const finalTicketPayload = {
      title: formData.title,
      from: formData.from,
      to: formData.to,
      transportType: formData.transportType,
      pricePerUnit: Number(formData.pricePerUnit),
      quantity: Number(formData.quantity),
      departureDateTime: formData.departureDateTime,
      perks: selectedPerks,
      image: imageUrl,
      vendorName: user?.name || "Anonymous Vendor",
      vendorEmail: user?.email || "",
      vendorId: user?.id || "",
      verificationStatus: "pending",
      isAdvertised: false,
      createdAt: new Date().toISOString(),
    };

    const data = await addTicket(finalTicketPayload);
    console.log(data);

    if (data.insertedId) {
      toast.success("Successfully added a new ticket!");

      setFormData({
        title: "",
        from: "",
        to: "",
        transportType: "bus",
        pricePerUnit: "",
        quantity: "",
        departureDateTime: "",
      });
      setSelectedPerks([]);
      setImageUrl("");
    } else {
      toast.error("Failed to add a new ticket!");
    }
  };

  if (isAuthPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 transition-colors duration-300">

      {/* Banner Component */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-indigo-900 dark:from-zinc-900 dark:to-zinc-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 text-white flex items-center space-x-4">
        <div className="p-3 bg-[#FF6B35] rounded-2xl shadow-lg">
          <PlusCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Create & Add Ticket Asset</h1>
          <p className="text-sm text-indigo-200 dark:text-zinc-400 font-medium mt-0.5">Deploy transit options on the global distribution stream matrix.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-zinc-200/40 dark:shadow-none border border-zinc-100 dark:border-zinc-800/80 p-6 sm:p-8 space-y-8">

        {/* SECTION 1: Core Identity Metadata */}
        <div className="space-y-5">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#1E3A8A] dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <Tag className="h-4 w-4" /> Primary Metadata
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Ticket Title / Fleet Route Label</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
              </span>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                placeholder="Ex: Green Line Scania Multi-Axle - Day Service"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">From (Terminal Origin)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                </span>
                <input
                  type="text"
                  name="from"
                  required
                  value={formData.from}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="Ex: Dhaka (Gabtoli)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">To (Terminal Destination)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-rose-500" />
                </span>
                <input
                  type="text"
                  name="to"
                  required
                  value={formData.to}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  placeholder="Ex: Cox's Bazar"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Inventory logistics */}
        <div className="space-y-5">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#1E3A8A] dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <Bus className="h-4 w-4" /> Inventory Logistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Transport Classification</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Bus className="h-4 w-4 text-zinc-400" />
                </span>
                <select
                  name="transportType"
                  value={formData.transportType}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] appearance-none"
                >
                  <option value="bus">Bus </option>
                  <option value="train">Train </option>
                  <option value="launch">Launch </option>
                  <option value="plane">Plane </option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Price (Per Unit)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-sm font-black text-zinc-400 dark:text-zinc-600">৳</span>
                </span>
                <input
                  type="number"
                  name="pricePerUnit"
                  required
                  min="1"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                  placeholder="Ex: 1250"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Ticket Quantity</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Layers className="h-4 w-4 text-zinc-400" />
                </span>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                  placeholder="Ex: 40"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Departure Date & Time</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-[#FF6B35]" />
              </span>
              <input
                type="datetime-local"
                name="departureDateTime"
                required
                value={formData.departureDateTime}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] tracking-wide"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Transit Perks */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#1E3A8A] dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Transit Perks & Accommodations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-1">
            {perkOptions.map((perk) => (
              <label
                key={perk.id}
                className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 ${selectedPerks.includes(perk.id)
                    ? "border-[#FF6B35] bg-orange-50/40 dark:bg-orange-500/5 text-[#FF6B35] font-bold shadow-sm"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-medium"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPerks.includes(perk.id)}
                  onChange={() => handlePerkToggle(perk.id)}
                  className="hidden"
                />
                <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${selectedPerks.includes(perk.id)
                    ? "bg-[#FF6B35] border-[#FF6B35] text-white"
                    : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                  }`}>
                  {selectedPerks.includes(perk.id) && <span className="text-[10px]">✓</span>}
                </div>
                <span className="text-sm">{perk.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SECTION 4: Image Upload Stream Wrapper */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#1E3A8A] dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> Imagery Presentation Media
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            <div className="md:col-span-2">
              <label className="relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#1E3A8A] dark:hover:border-zinc-500 rounded-2xl cursor-pointer bg-zinc-50 dark:bg-zinc-950/40 transition-colors p-4 text-center">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-[#FF6B35] mb-2" />
                      <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Uploading asset to Imgbb...</p>
                    </>
                  ) : imageUrl ? (
                    <>
                      <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2" />
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Media source linked accurately!</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-zinc-400 mb-2" />
                      <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Click to upload vehicle banner asset</p>
                      <p className="text-xs text-zinc-400 mt-0.5">Supports PNG, JPG</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-36 p-2 overflow-hidden">
              {imageUrl ? (
                <Image width={300} height={300}
                  src={imageUrl}
                  alt="Uploaded Source Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-center px-4">Live Preview Container</span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 5: Implicit Security Data Nodes */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#1E3A8A] dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <User className="h-4 w-4" /> Vendor Authority Identity Validation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Vendor Provider Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
                </span>
                <input
                  type="text"
                  readOnly
                  value={user?.name || "Anonymous Authorized Vendor"}
                  className="w-full pl-11 pr-4 py-3 text-sm font-bold rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 text-zinc-500 dark:text-zinc-400 cursor-not-allowed select-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Vendor Registered Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
                </span>
                <input
                  type="email"
                  readOnly
                  value={user?.email || "loading provider context..."}
                  className="w-full pl-11 pr-4 py-3 text-sm font-bold rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 text-zinc-500 dark:text-zinc-400 cursor-not-allowed select-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Submit Action / Fraud Warning System */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          {user?.isFraud ? (
            <div className="w-full bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4 rounded-xl flex items-center space-x-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-bold">
              You have been marked as (Fraud). Your ability to upload new tickets has been suspended.
              </p>
            </div>
          ) : (
            <button
              type="submit"
              disabled={isUploading}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-[#FF6B35] hover:bg-[#ff571a] text-white font-black text-sm rounded-xl shadow-lg shadow-orange-500/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add Ticket to Distribution</span>
            </button>
          )}
        </div>

      </form>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { toast } from "react-toastify";
import {
    PencilLine, Tag, MapPin, Bus,
    Layers, Calendar, Sparkles, Image as ImageIcon,
    Loader2, UploadCloud, CheckCircle2
} from "lucide-react";
import { updateTicket } from "@/lib/actions/tiketInfoUpdate";
import { useRouter } from "next/navigation";

// import { updateTicket } from "@/lib/actions/tickets"; // tumi mongodb logic ey jaiga te lagabe

const perkOptions = [
    { id: "AC", label: "Air Conditioning (AC)" },
    { id: "Breakfast", label: "Complimentary Breakfast" },
    { id: "WiFi", label: "High-Speed Wi-Fi" },
    { id: "ChargingPort", label: "USB Charging Port" },
    { id: "Sleeper", label: "Luxury Sleeper Berth" }
];

const UpdateTicketButton = ({ ticket }) => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState(ticket?.image || "");
    const [selectedPerks, setSelectedPerks] = useState(ticket?.perks || []);

    const [formData, setFormData] = useState({
        title: ticket?.title || "",
        from: ticket?.from || "",
        to: ticket?.to || "",
        transportType: ticket?.transportType || "bus",
        pricePerUnit: ticket?.pricePerUnit || "",
        quantity: ticket?.quantity || "",
        departureDateTime: ticket?.departureDateTime || "",
    });

    // imgbb upload handler (same logic as AddTicketForm)
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

    const handlePerkToggle = (perkId) => {
        setSelectedPerks((prev) =>
            prev.includes(perkId) ? prev.filter((item) => item !== perkId) : [...prev, perkId]
        );
    };

    const handleSubmit = async (e, closeModal) => {
        e.preventDefault();

        if (!imageUrl) {
            toast.warn("Please upload an image asset first!");
            return;
        }

        const updatedPayload = {
            title: formData.title,
            from: formData.from,
            to: formData.to,
            transportType: formData.transportType,
            pricePerUnit: Number(formData.pricePerUnit),
            quantity: Number(formData.quantity),
            departureDateTime: formData.departureDateTime,
            perks: selectedPerks,
            image: imageUrl,
            updatedAt: new Date().toISOString(),
        };

        setIsSubmitting(true);
        try {
            const ticketId = ticket?._id;
            // tumi ey jaiga te tomar mongodb update logic call korba
            const data = await updateTicket(ticketId, updatedPayload);

            if (data?.modifiedCount > 0 || data?.success) {
                toast.success("Ticket successfully updated!");
                closeModal?.();
                router.refresh();
            } else {
                toast.error("Failed to update ticket!");
            }
        } catch (err) {
            console.error("Update ticket error:", err);
            toast.error("Something went wrong while updating!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal>
            <Button className="flex-1 py-3 px-5 rounded-xl text-xs font-black tracking-wider uppercase bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md shadow-indigo-600/10 dark:shadow-blue-600/10 active:scale-95 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed border-none flex items-center justify-center gap-2">
                <PencilLine className="h-4 w-4 stroke-[2.5]" />
                <span>Update Ticket</span>
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Header className="flex items-center justify-between gap-4 pt-5 pb-3 px-1 border-b border-zinc-100 dark:border-zinc-800/60 w-full">
                            {/* 📝 Left Side Text Group */}
                            <div className="flex flex-col text-left">
                                <Modal.Heading className="text-lg md:text-xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                                    Update Ticket Info
                                </Modal.Heading>
                                <span className="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-wider">
                                    Terminal Configuration
                                </span>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className="space-y-8"
                            >
                                {/* SECTION 1: Core Identity Metadata */}
                                <div className="space-y-5">
                                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#1E3A8A] dark:text-blue-400 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
                                        <Tag className="h-4 w-4" /> Primary Metadata
                                    </h3>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                                            Ticket Title / Fleet Route Label
                                        </label>
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
                                            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                                                From (Terminal Origin)
                                            </label>
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
                                            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                                                To (Terminal Destination)
                                            </label>
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
                                            <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                                                Transport Classification
                                            </label>
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
                                                    <option value="bus">Bus</option>
                                                    <option value="train">Train</option>
                                                    <option value="launch">Launch</option>
                                                    <option value="plane">Plane</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                                                Price (Per Unit)
                                            </label>
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
                                            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                                                Ticket Quantity
                                            </label>
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
                                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                                            Departure Date & Time
                                        </label>
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
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
                                                <div
                                                    className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${selectedPerks.includes(perk.id)
                                                        ? "bg-[#FF6B35] border-[#FF6B35] text-white"
                                                        : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                                        }`}
                                                >
                                                    {selectedPerks.includes(perk.id) && <span className="text-[10px]">✓</span>}
                                                </div>
                                                <span className="text-sm">{perk.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* SECTION 4: Image Upload */}
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
                                                            <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                                                                Uploading asset to Imgbb...
                                                            </p>
                                                        </>
                                                    ) : imageUrl ? (
                                                        <>
                                                            <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2" />
                                                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                                                Media source linked accurately!
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UploadCloud className="h-8 w-8 text-zinc-400 mb-2" />
                                                            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                                                                Click to upload vehicle banner asset
                                                            </p>
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
                                                <img
                                                    src={imageUrl}
                                                    alt="Uploaded Source Preview"
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            ) : (
                                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-center px-4">
                                                    Live Preview Container
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Modal.Footer className="px-0">
                                    <Button slot="close" variant="secondary" type="button">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        slot="close"
                                        disabled={isUploading || isSubmitting}
                                        className="inline-flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <PencilLine className="h-4 w-4" />
                                        )}
                                        <span>Update Ticket</span>
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateTicketButton;
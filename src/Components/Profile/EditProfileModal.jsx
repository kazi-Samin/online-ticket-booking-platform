// 'use client'

// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { X, User, Image as ImageIcon, ArrowRight, Sparkles, Upload, Loader2 } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";

// export default function EditProfileModal({ isOpen, onClose, currentUser }) {
//   const [name, setName] = useState(currentUser?.name || "");
//   const [imageUrl, setImageUrl] = useState(currentUser?.image || "");
//   const [uploading, setUploading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(currentUser?.image || "");

//   const fileInputRef = useRef(null);

//   // 📸 Image Selection and ImgBB Upload Mechanism
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Instant client-side local preview
//     const localPreview = URL.createObjectURL(file);
//     setPreviewUrl(localPreview);
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
//       if (!apiKey) {
//         throw new Error("ImgBB API key is missing in environment variables.");
//       }

//       const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         const uploadedUrl = data.data.url;
//         setImageUrl(uploadedUrl);
//         setPreviewUrl(uploadedUrl);
//         toast.success("Image uploaded successfully.");
//       } else {
//         toast.error("Failed to upload image. Please check API configuration.");
//       }
//     } catch (error) {
//       console.error("ImgBB Upload Error:", error);
//       toast.error("Network error occurred during image upload.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // 💾 Form Submission via Better Auth User Update API
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (uploading) {
//       toast.warning("Please wait until the image upload is complete.");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       // Better Auth implementation to update profile specifications
//       await authClient.updateUser({
//         name: name,
//         image: imageUrl,
//       }, {
//         onRequest: () => {
//           // Additional initialization steps if required
//         },
//         onSuccess: () => {
//           toast.success("Profile updated successfully.");
//           onClose();
//         },
//         onError: (ctx) => {
//           toast.error(ctx.error.message || "Failed to update profile features.");
//         }
//       });
//     } catch (error) {
//       console.error("Profile Update Error:", error);
//       toast.error("An unexpected error occurred while updating the profile.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop Overlay */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
//       />

//       {/* Modal Container */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95, y: 10 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.95, y: 10 }}
//         className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[28px] shadow-2xl p-6 overflow-hidden z-10"
//       >
//         {/* Decorative Top Background Glow */}
//         <div className="absolute -top-12 -right-12 h-32 w-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl" />

//         {/* Modal Header Section */}
//         <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-6">
//           <div className="flex items-center gap-2">
//             <Sparkles className="h-4 w-4 text-[#FF6B35]" />
//             <h3 className="text-base font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
//               Update Profile
//             </h3>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-xl hover:text-zinc-900 dark:hover:text-white transition-colors"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Configuration Form */}
//         <form onSubmit={handleFormSubmit} className="space-y-5">

//           {/* Avatar Rendering & Upload Input */}
//           <div className="flex flex-col items-center justify-center space-y-3 pb-2">
//             <div className="relative group">
//               <div className="h-24 w-24 rounded-2xl overflow-hidden ring-4 ring-zinc-100 dark:ring-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center shadow-inner relative">
//                 {previewUrl ? (
//                   <img src={previewUrl} alt="Avatar Preview" className="h-full w-full object-cover" />
//                 ) : (
//                   <ImageIcon className="h-8 w-8 text-zinc-400" />
//                 )}

//                 {/* Uploading State Overlay View */}
//                 {uploading && (
//                   <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center">
//                     <Loader2 className="h-6 w-6 animate-spin text-white" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef}
//               onChange={handleImageChange}
//               className="hidden"
//             />
//             <button
//               type="button"
//               disabled={uploading || submitting}
//               onClick={() => fileInputRef.current?.click()}
//               className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
//             >
//               <Upload className="h-3.5 w-3.5" />
//               {uploading ? "Uploading..." : "Upload New Photo"}
//             </button>
//           </div>

//           {/* Full Name Input Parameter */}
//           <div className="space-y-1.5">
//             <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide block pl-0.5">
//               Full Name
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
//                 <User className="h-4 w-4" />
//               </span>
//               <input
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-semibold outline-none focus:border-[#FF6B35] focus:bg-white dark:focus:bg-zinc-950 transition-all duration-200"
//                 placeholder="Name Specification"
//               />
//             </div>
//           </div>

//           {/* Form Actions Panel */}
//           <div className="flex items-center gap-3 pt-2">
//             <button
//               type="button"
//               disabled={submitting}
//               onClick={onClose}
//               className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200/70 dark:bg-zinc-800 dark:hover:bg-zinc-700/70 text-zinc-700 dark:text-zinc-300 font-bold text-xs rounded-xl transition-all uppercase tracking-widest text-center disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={uploading || submitting}
//               className="flex-1 py-3 bg-gradient-to-r from-[#1E3A8A] to-blue-600 hover:from-[#FF6B35] hover:to-orange-600 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-widest disabled:opacity-50"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...
//                 </>
//               ) : (
//                 <>
//                   Save Changes <ArrowRight className="h-3.5 w-3.5" />
//                 </>
//               )}
//             </button>
//           </div>

//         </form>
//       </motion.div>
//     </div>
//   );
// }
"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, User, Image as ImageIcon, Sparkles, Upload, Loader2, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function EditProfileModal({ isOpen, onClose, currentUser }) {
  const [name, setName] = useState(currentUser?.name || "");
  const [imageUrl, setImageUrl] = useState(currentUser?.image || "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUser?.image || "");

  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API key is missing in environment variables.");
      }

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const uploadedUrl = data.data.url;
        setImageUrl(uploadedUrl);
        setPreviewUrl(uploadedUrl);
        toast.success("Image uploaded successfully.");
      } else {
        toast.error("Failed to upload image. Please check API configuration.");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      toast.error("Network error occurred during image upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
      toast.warning("Please wait until the image upload is complete.");
      return;
    }

    setSubmitting(true);

    try {
      await authClient.updateUser({
        name: name,
        image: imageUrl,
      }, {
        onRequest: () => {},
        onSuccess: () => {
          toast.success("Profile updated successfully.");
          onClose();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to update profile features.");
        }
      });
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("An unexpected error occurred while updating the profile.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-md bg-zinc-900/90 backdrop-blur-2xl border border-indigo-500/20 rounded-[32px] shadow-2xl p-6 sm:p-8 overflow-hidden z-10 text-zinc-100"
      >
        <div className="absolute -top-12 -right-12 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-widest">
              Sync Identity Specifications
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-zinc-800/50 border border-zinc-700/40 text-zinc-400 rounded-xl hover:text-white transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">

          <div className="flex flex-col items-center justify-center space-y-3 pb-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="h-24 w-24 rounded-2xl overflow-hidden ring-2 ring-zinc-800 bg-zinc-950 flex items-center justify-center shadow-inner relative z-10">
                {previewUrl ? (
                  <img src={previewUrl} alt="Avatar Preview" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-7 w-7 text-zinc-600" />
                )}

                {uploading && (
                  <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center z-20">
                    <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                  </div>
                )}
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading || submitting}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/30 text-zinc-300 font-bold text-xs rounded-xl transition-all active:scale-95 disabled:opacity-50 uppercase tracking-wider"
            >
              <Upload className="h-3.5 w-3.5 text-zinc-400" />
              {uploading ? "Uploading Layer..." : "Upload Identity Photo"}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block pl-1">
              Legal Identity Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 flex items-center pointer-events-none text-zinc-600 z-10">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950/40 border border-zinc-800 text-zinc-200 placeholder-zinc-700 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm font-semibold outline-none focus:border-indigo-500 transition-all"
                placeholder="Enter full specification name"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={submitting}
              onClick={onClose}
              className="flex-1 py-3.5 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 border border-zinc-700/30 font-bold text-xs rounded-2xl transition-all uppercase tracking-widest text-center disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || submitting}
              className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 transition-all duration-300 uppercase tracking-widest disabled:opacity-50 border border-indigo-500/20"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <span>Save Changes</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
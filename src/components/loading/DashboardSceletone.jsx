import React from "react";

// Skeleton reusable box
const SkeletonBox = ({ className }) => (
    <div
        className={`relative overflow-hidden rounded-lg bg-gray-200 ${className}`}
    >
        <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
);

export default function DashboardSceletone() {
    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex-1 p-6 space-y-6">
                <SkeletonBox className="h-14 w-56 my-5 " />
                <div className="flex gap-6">
                    <SkeletonBox className="h-40 flex-4" />
                    <SkeletonBox className="h-40 flex-6" />
                </div>
                <div className="flex gap-6">
                    <SkeletonBox className="h-130 w-full flex-6" />
                    <SkeletonBox className="h-130 w-full flex-4" />
                </div>

            </div>
        </div>
    );
}

import React from "react";

const SkeletonBox = ({ className }) => (
    <div className={`relative overflow-hidden rounded-md bg-gray-200 h-5 ${className}`}>
        {/* Layer shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/100 to-transparent blur-sm opacity-70 animate-[shimmer_2s_infinite_linear]" />
    </div>
);

export default function DashboardSceletone() {
    return (
        <div className="flex h-screen bg-gray-50">
            <div className="hidden md:block w-full">
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
            <div className="md:hidden block">
                <div className="flex-1 p-6 pt-0 space-y-6 w-screen">
                    <SkeletonBox className="h-34 w-full my-5 " />
                    <div className="flex gap-6">
                        <SkeletonBox className="flex-1 h-10" />
                        <SkeletonBox className="flex-1 h-10" />
                    </div>
                    <SkeletonBox className="h-60 w-full" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-6 w-full h-15">
                            <SkeletonBox className="w-15 h-15" />

                            <div className="flex flex-col justify-around h-full">
                                <SkeletonBox className="w-40 h-7" />
                                <SkeletonBox className="w-20 h-4" />
                            </div>

                            <div className="flex flex-1 flex-col justify-center items-end">
                                <SkeletonBox className="w-20 h-6" />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

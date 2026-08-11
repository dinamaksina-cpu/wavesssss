"use client";
import { useState } from "react";
import Image from "next/image";
export function BeforeAfter({before,after,beforeAlt="Before — replace with real project image",afterAlt="After — replace with real project image"}:{before:string;after:string;beforeAlt?:string;afterAlt?:string}){const [value,setValue]=useState(50);return <div className="before-after" style={{"--position":`${value}%`} as React.CSSProperties}><Image src={before} alt={beforeAlt} fill unoptimized/><div className="after-image"><Image src={after} alt={afterAlt} fill unoptimized/></div><input type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))} aria-label="Reveal before and after comparison"/><div className="slider-line" aria-hidden="true"><span>↔</span></div></div>}

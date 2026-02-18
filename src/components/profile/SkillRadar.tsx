"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface SkillData {
    subject: string;
    A: number; // Current Level/Score
    fullMark: number;
}

interface SkillRadarProps {
    data: SkillData[];
}

export function SkillRadar({ data }: SkillRadarProps) {
    return (
        <div className="w-full h-[300px] bg-surface border border-border rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-bold text-text-primary mb-4">Skill Breakdown</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="#14F195"
                            fill="#14F195"
                            fillOpacity={0.3}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#14F195' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

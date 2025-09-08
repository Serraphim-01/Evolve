import React from 'react';
import { Code, Braces, FileJson, Coffee, Plus, Type, SignalLow, SignalMedium, SignalHigh, Globe } from 'lucide-react';

export const getLanguageIcon = (language: string, className?: string) => {
    const props = { className: className || "h-5 w-5 text-white" };
    switch (language) {
        case 'JavaScript': return <Braces {...props} />;
        case 'Python': return <FileJson {...props} />;
        case 'Java': return <Coffee {...props} />;
        case 'C++': return <Plus {...props} />;
        case 'TypeScript': return <Type {...props} />;
        case 'all': return <Globe {...props} />;
        default: return <Code {...props} />;
    }
};

export const getDifficultyIcon = (difficulty: string) => {
    const props = { className: "h-5 w-5 text-hacker-green" };
    switch (difficulty) {
        case 'beginner': return <SignalLow {...props} />;
        case 'intermediate': return <SignalMedium {...props} />;
        case 'advanced': return <SignalHigh {...props} />;
        default: return null;
    }
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, FileText, Save } from 'lucide-react';
import { Mission } from '../../types';

export const CreateMission = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    challenge: '',
    xpReward: 100,
    type: 'normal' as 'normal' | 'timed' | 'one-time',
    mode: 'normal' as 'normal' | 'pvp' | 'pvsai',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (type: 'normal' | 'timed' | 'one-time') => {
    setFormData(prev => ({
      ...prev,
      type,
    }));
  };

  const handleModeChange = (mode: 'normal' | 'pvp' | 'pvsai') => {
    setFormData(prev => ({
      ...prev,
      mode,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Mission created:', formData);
    // Here you would typically send the data to your backend
    alert('Mission created successfully!');
  };

  return (
    <div className="flex-1 bg-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Mission</h1>
          <p className="text-white">Share a coding challenge with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-black border border-white rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mission Title
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-5 w-5 text-white" />
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter mission title..."
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white placeholder-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Challenge Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('normal')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === 'normal'
                        ? 'border-hacker-green bg-hacker-green text-black'
                        : 'border-white bg-black text-white hover:border-hacker-green hover:text-hacker-green'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('timed')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === 'timed'
                        ? 'border-hacker-green bg-hacker-green text-black'
                        : 'border-white bg-black text-white hover:border-hacker-green hover:text-hacker-green'
                    }`}
                  >
                    Timed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('one-time')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === 'one-time'
                        ? 'border-hacker-green bg-hacker-green text-black'
                        : 'border-white bg-black text-white hover:border-hacker-green hover:text-hacker-green'
                    }`}
                  >
                    One-Time
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Challenge Mode
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleModeChange('normal')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.mode === 'normal'
                        ? 'border-hacker-green bg-hacker-green text-black'
                        : 'border-white bg-black text-white hover:border-hacker-green hover:text-hacker-green'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange('pvp')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.mode === 'pvp'
                        ? 'border-hacker-green bg-hacker-green text-black'
                        : 'border-white bg-black text-white hover:border-hacker-green hover:text-hacker-green'
                    }`}
                  >
                    PVP
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange('pvsai')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.mode === 'pvsai'
                        ? 'border-hacker-green bg-hacker-green text-black'
                        : 'border-white bg-black text-white hover:border-hacker-green hover:text-hacker-green'
                    }`}
                  >
                    Player vs. AI
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Challenge
                </label>
                <textarea
                  value={formData.challenge}
                  onChange={(e) => handleInputChange('challenge', e.target.value)}
                  placeholder="Describe the mission objectives, requirements, and any helpful hints..."
                  rows={12}
                  className="w-full p-4 bg-black border border-white rounded-lg focus:border-hacker-green focus:outline-none text-white placeholder-white resize-none"
                  required
                />
              </div>

              <div className="bg-black border border-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="h-5 w-5 text-hacker-green" />
                  <h3 className="text-lg font-semibold text-white">Reward Preview</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">XP Reward:</span>
                    <span className="text-white font-medium">{formData.xpReward} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white">
            <button
              type="button"
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-hacker-green text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-80 transition-colors"
            >
              <Save className="h-5 w-5" />
              <span>Publish Mission</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
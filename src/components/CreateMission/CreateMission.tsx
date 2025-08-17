import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Code, Tag, Award, FileText, Save } from 'lucide-react';

export const CreateMission = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'JavaScript',
    difficulty: 'beginner',
    xpReward: 100,
    tags: '',
  });

  const languages = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 
    'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner', xp: 100 },
    { value: 'intermediate', label: 'Intermediate', xp: 150 },
    { value: 'advanced', label: 'Advanced', xp: 250 },
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDifficultyChange = (difficulty: string) => {
    const selectedDifficulty = difficulties.find(d => d.value === difficulty);
    setFormData(prev => ({
      ...prev,
      difficulty,
      xpReward: selectedDifficulty?.xp || 100
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
          <p className="text-gray-400">Share a coding challenge with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mission Title
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter mission title..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:outline-none text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Programming Language
                </label>
                <div className="relative">
                  <Code className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:outline-none text-white appearance-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {difficulties.map(({ value, label, xp }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleDifficultyChange(value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.difficulty === value
                          ? 'border-white bg-white text-black'
                          : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs">{xp} XP</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (comma separated)
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="algorithms, data-structures, recursion..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:outline-none text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mission Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the mission objectives, requirements, and any helpful hints..."
                  rows={12}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:border-white focus:outline-none text-white placeholder-gray-400 resize-none"
                  required
                />
              </div>

              <div className="bg-black rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Reward Preview</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">XP Reward:</span>
                    <span className="text-white font-medium">{formData.xpReward} XP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className="text-white font-medium capitalize">{formData.difficulty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Language:</span>
                    <span className="text-white font-medium">{formData.language}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-800">
            <button
              type="button"
              className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
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
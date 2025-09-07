export interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  exp: number;
  tags: string[];
  language: string;
  expectedTimeToSolve: string;
  recommendedLevel: number;
  testCases: { input: string; expectedOutput: string }[];
}

export const missions: Mission[] = [
  {
    id: 1,
    title: 'Reverse a String',
    description: 'Write a function that reverses a string.',
    difficulty: 'Easy',
    exp: 50,
    tags: ['string', 'algorithm'],
    language: 'JavaScript',
    expectedTimeToSolve: '15 minutes',
    recommendedLevel: 1,
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'world', expectedOutput: 'dlrow' },
    ],
  },
  {
    id: 2,
    title: 'FizzBuzz',
    description: 'Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.',
    difficulty: 'Easy',
    exp: 50,
    tags: ['loops', 'conditionals'],
    language: 'Python',
    expectedTimeToSolve: '10 minutes',
    recommendedLevel: 1,
    testCases: [
      { input: '15', expectedOutput: 'FizzBuzz' },
      { input: '9', expectedOutput: 'Fizz' },
    ],
  },
  {
    id: 3,
    title: 'Find the Longest Word',
    description: 'Write a function that takes a string and returns the longest word in the string.',
    difficulty: 'Medium',
    exp: 100,
    tags: ['string', 'algorithm'],
    language: 'JavaScript',
    expectedTimeToSolve: '20 minutes',
    recommendedLevel: 2,
    testCases: [
      { input: 'The quick brown fox jumped over the lazy dog', expectedOutput: 'jumped' },
      { input: 'A journey of a thousand miles begins with a single step', expectedOutput: 'thousand' },
    ],
  },
];

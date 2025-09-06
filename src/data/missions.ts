export interface Mission {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  exp: number;
  tags: string[];
}

export const missions: Mission[] = [
  {
    id: 1,
    title: 'Reverse a String',
    description: 'Write a function that reverses a string.',
    difficulty: 'Easy',
    exp: 50,
    tags: ['string', 'algorithm'],
  },
  {
    id: 2,
    title: 'FizzBuzz',
    description: 'Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.',
    difficulty: 'Easy',
    exp: 50,
    tags: ['loops', 'conditionals'],
  },
  {
    id: 3,
    title: 'Find the Longest Word',
    description: 'Write a function that takes a string and returns the longest word in the string.',
    difficulty: 'Medium',
    exp: 100,
    tags: ['string', 'algorithm'],
  },
];

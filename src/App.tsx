import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { numberMeanings } from './numberMeanings';

const redNumbers = ['05', '15', '50', '59', '95', '97', '03', '07', '30', '34', '47', '74', '52', '71', '79', '02', '20', '24', '35', '72', '75', '80', '81', '58', '78', '85', '87', '12', '16', '45', '51', '39', '43', '53', '57', '10', '140'];
const greenNumbers = ['08', '18', '28', '68', '86', '89', '98', '06', '61', '96', '19', '33', '83', '91', '92', '93', '32', '42', '84', '46', '13', '17', '21', '22', '23', '29', '80'];

function App() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<{ pair: string; meaning: string }[]>([]);
  const [sum, setSum] = useState<{ value: number; meaning: string } | null>(null);

  const analyzeNumber = () => {
    const pairs = [];
    for (let i = 0; i < input.length - 1; i++) {
      const pair = input.slice(i, i + 2);
      pairs.push({
        pair,
        meaning: numberMeanings[pair] || 'Không có ý nghĩa',
      });
    }
    setAnalysis(pairs);

    const digitSum = input.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    setSum({
      value: digitSum,
      meaning: numberMeanings[digitSum.toString()] || 'Không có ý nghĩa',
    });
  };

  const getBackgroundColor = (pair: string) => {
    if (redNumbers.includes(pair)) return 'bg-red-200';
    if (greenNumbers.includes(pair)) return 'bg-green-200';
    return 'bg-yellow-100'; // Light yellow for all other numbers
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Phân Tích Số</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/g, ''))}
            placeholder="Nhập dãy số..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={analyzeNumber}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search size={24} />
          </button>
        </div>
        {analysis.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Phân tích từng cặp số:</h2>
            <ul className="space-y-2">
              {analysis.map(({ pair, meaning }, index) => (
                <li key={index} className={`p-2 rounded ${getBackgroundColor(pair)}`}>
                  <span className="font-bold">{pair}:</span> {meaning}
                </li>
              ))}
            </ul>
          </div>
        )}
        {sum && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Tổng các chữ số:</h2>
            <p className={`p-2 rounded ${getBackgroundColor(sum.value.toString())}`}>
              <span className="font-bold">{sum.value}:</span> {sum.meaning}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
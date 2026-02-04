import { PrismaClient, Difficulty, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Clear existing data
  await prisma.sessionEvent.deleteMany();
  await prisma.aiInteraction.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.session.deleteMany();
  await prisma.testCase.deleteMany();
  await prisma.problem.deleteMany();

  // Problem 1: Two Sum
  const twoSum = await prisma.problem.create({
    data: {
      title: "Two Sum",
      slug: "two-sum",
      description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
      difficulty: Difficulty.EASY,
      category: Category.ARRAY,
      tags: ["Hash Table", "Array"],
      functionName: "twoSum",
      starterCode: {
        python: `def twoSum(nums, target):
    # Write your code here
    pass`,
        javascript: `function twoSum(nums, target) {
    // Write your code here
}`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        return {};
    }
};`,
        go: `package main

func twoSum(nums []int, target int) []int {
    // Write your code here
    return []int{}
}`,
      },
      testCases: {
        create: [
          {
            input: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }),
            output: JSON.stringify([0, 1]),
            isPublic: true,
            order: 1,
          },
          {
            input: JSON.stringify({ nums: [3, 2, 4], target: 6 }),
            output: JSON.stringify([1, 2]),
            isPublic: true,
            order: 2,
          },
          {
            input: JSON.stringify({ nums: [3, 3], target: 6 }),
            output: JSON.stringify([0, 1]),
            isPublic: false,
            order: 3,
          },
        ],
      },
    },
  });

  // Problem 2: Reverse String
  const reverseString = await prisma.problem.create({
    data: {
      title: "Reverse String",
      slug: "reverse-string",
      description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.

**Example 1:**
\`\`\`
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`

**Example 2:**
\`\`\`
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
\`\`\`

**Constraints:**
- 1 <= s.length <= 10^5
- s[i] is a printable ASCII character.`,
      difficulty: Difficulty.EASY,
      category: Category.STRING,
      tags: ["Two Pointers", "String"],
      functionName: "reverseString",
      starterCode: {
        python: `def reverseString(s):
    # Write your code here
    pass`,
        javascript: `function reverseString(s) {
    // Write your code here
}`,
        java: `class Solution {
    public void reverseString(char[] s) {
        // Write your code here
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your code here
    }
};`,
        go: `package main

func reverseString(s []byte) {
    // Write your code here
}`,
      },
      testCases: {
        create: [
          {
            input: JSON.stringify({ s: ["h", "e", "l", "l", "o"] }),
            output: JSON.stringify(["o", "l", "l", "e", "h"]),
            isPublic: true,
            order: 1,
          },
          {
            input: JSON.stringify({ s: ["H", "a", "n", "n", "a", "h"] }),
            output: JSON.stringify(["h", "a", "n", "n", "a", "H"]),
            isPublic: true,
            order: 2,
          },
          {
            input: JSON.stringify({ s: ["A"] }),
            output: JSON.stringify(["A"]),
            isPublic: false,
            order: 3,
          },
        ],
      },
    },
  });

  // Problem 3: Valid Parentheses
  const validParentheses = await prisma.problem.create({
    data: {
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
\`\`\`
Input: s = "()"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: s = "(]"
Output: false
\`\`\`

**Constraints:**
- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.`,
      difficulty: Difficulty.EASY,
      category: Category.STACK,
      tags: ["Stack", "String"],
      functionName: "isValid",
      starterCode: {
        python: `def isValid(s):
    # Write your code here
    pass`,
        javascript: `function isValid(s) {
    // Write your code here
}`,
        java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }
}`,
        cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        return false;
    }
};`,
        go: `package main

func isValid(s string) bool {
    // Write your code here
    return false
}`,
      },
      testCases: {
        create: [
          {
            input: JSON.stringify({ s: "()" }),
            output: "true",
            isPublic: true,
            order: 1,
          },
          {
            input: JSON.stringify({ s: "()[]{}" }),
            output: "true",
            isPublic: true,
            order: 2,
          },
          {
            input: JSON.stringify({ s: "(]" }),
            output: "false",
            isPublic: true,
            order: 3,
          },
          {
            input: JSON.stringify({ s: "{[]}" }),
            output: "true",
            isPublic: false,
            order: 4,
          },
        ],
      },
    },
  });

  // Problem 4: Binary Search
  const binarySearch = await prisma.problem.create({
    data: {
      title: "Binary Search",
      slug: "binary-search",
      description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

**Example 1:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
\`\`\`

**Constraints:**
- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4
- All the integers in nums are unique.
- nums is sorted in ascending order.`,
      difficulty: Difficulty.EASY,
      category: Category.SEARCHING,
      tags: ["Binary Search", "Array"],
      functionName: "search",
      starterCode: {
        python: `def search(nums, target):
    # Write your code here
    pass`,
        javascript: `function search(nums, target) {
    // Write your code here
}`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        return -1;
    }
};`,
        go: `package main

func search(nums []int, target int) int {
    // Write your code here
    return -1
}`,
      },
      testCases: {
        create: [
          {
            input: JSON.stringify({ nums: [-1, 0, 3, 5, 9, 12], target: 9 }),
            output: "4",
            isPublic: true,
            order: 1,
          },
          {
            input: JSON.stringify({ nums: [-1, 0, 3, 5, 9, 12], target: 2 }),
            output: "-1",
            isPublic: true,
            order: 2,
          },
          {
            input: JSON.stringify({ nums: [5], target: 5 }),
            output: "0",
            isPublic: false,
            order: 3,
          },
        ],
      },
    },
  });

  // Problem 5: FizzBuzz
  const fizzBuzz = await prisma.problem.create({
    data: {
      title: "FizzBuzz",
      slug: "fizzbuzz",
      description: `Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:

- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.

**Example 1:**
\`\`\`
Input: n = 3
Output: ["1","2","Fizz"]
\`\`\`

**Example 2:**
\`\`\`
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
\`\`\`

**Example 3:**
\`\`\`
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
\`\`\`

**Constraints:**
- 1 <= n <= 10^4`,
      difficulty: Difficulty.EASY,
      category: Category.MATH,
      tags: ["Math", "String"],
      functionName: "fizzBuzz",
      starterCode: {
        python: `def fizzBuzz(n):
    # Write your code here
    pass`,
        javascript: `function fizzBuzz(n) {
    // Write your code here
}`,
        java: `import java.util.*;

class Solution {
    public List<String> fizzBuzz(int n) {
        // Write your code here
        return new ArrayList<>();
    }
}`,
        cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> fizzBuzz(int n) {
        // Write your code here
        return {};
    }
};`,
        go: `package main

func fizzBuzz(n int) []string {
    // Write your code here
    return []string{}
}`,
      },
      testCases: {
        create: [
          {
            input: JSON.stringify({ n: 3 }),
            output: JSON.stringify(["1", "2", "Fizz"]),
            isPublic: true,
            order: 1,
          },
          {
            input: JSON.stringify({ n: 5 }),
            output: JSON.stringify(["1", "2", "Fizz", "4", "Buzz"]),
            isPublic: true,
            order: 2,
          },
          {
            input: JSON.stringify({ n: 15 }),
            output: JSON.stringify([
              "1",
              "2",
              "Fizz",
              "4",
              "Buzz",
              "Fizz",
              "7",
              "8",
              "Fizz",
              "Buzz",
              "11",
              "Fizz",
              "13",
              "14",
              "FizzBuzz",
            ]),
            isPublic: false,
            order: 3,
          },
        ],
      },
    },
  });

  console.log("✅ Seeded 5 problems:");
  console.log(`   - ${twoSum.title} (${twoSum.difficulty})`);
  console.log(`   - ${reverseString.title} (${reverseString.difficulty})`);
  console.log(`   - ${validParentheses.title} (${validParentheses.difficulty})`);
  console.log(`   - ${binarySearch.title} (${binarySearch.difficulty})`);
  console.log(`   - ${fizzBuzz.title} (${fizzBuzz.difficulty})`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

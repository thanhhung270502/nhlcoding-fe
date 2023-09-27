# Approach

The brute force approach is simple. Loop through each element $x$ and find if there is another value that equals to $target - x$.

# Implementation

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            for  (int j = i + 1; j < nums.size(); j++) {
                if (nums[j] + nums[i] == target) {
                    return vector<int>{i, j};
                }
            }
        }

        return vector<int>();
    }
};
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[j] == target - nums[i]:
                    return [i, j]
```

# Complexity Analysis

-   Time complexity: $O(n^2)$.
    For each element, we try to find its complement by looping through the rest of the array which takes $O(n)$ time.
    Therefore, the time complexity is $O(n^2)$.

-   Space complexity: $O(1)$.
    The space required does not depend on the size of the input array, so only constant space is used.

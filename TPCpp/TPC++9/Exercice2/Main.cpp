#include <vector>
#include <iostream>
#include <algorithm>  
using namespace std;

bool isOdd(int i) { return i % 2 == 1; }

int main() {
	vector<int> val = { 5,2,4,7,8,0,2,1 };
	vector<int>::iterator it = stable_partition(val.begin(), val.end(), isOdd);

	vector<int> valTriee;
	for (vector<int>::iterator itr = it; itr != val.end(); itr++) {
		valTriee.push_back(*itr);
	}
	for (vector<int>::iterator itr = val.begin(); itr != it; itr++) {
		valTriee.push_back(*itr);
	}
}
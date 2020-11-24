#include <iostream>
#include <vector>
using namespace std;

template<typename Iter>
typename Iter::value_type
partiel_dot(Iter first1, Iter last1, Iter first2, Iter last2) {
	typename Iter::value_type somme = 0;
	while (first1 != last1 || first2 != last2) {
		somme += *first1 * *first2;
		first1++; first2++;
	}
	return somme;

}


int main() {
	vector<int> v1 = { 1,2,3,4 };
	vector<int> v2 = { 2,3,4,5 };
	cout << partiel_dot(v1.begin(), v1.end(), v2.begin(), v2.end());
}


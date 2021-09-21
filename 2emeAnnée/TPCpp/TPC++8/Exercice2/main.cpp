#include <vector>
#include <iostream>
using namespace std;


template<class T>
bool isAllPos(vector<T> vec) {
	for (int i = 0; i <= vec.size(); i++) {
		if (vec[i] < 0 )
			return false;
	}
	return true;
}


template<class T>
void replace0(vector<T>& vec) {
	for (int i = 0; i < vec.size();i++) {
		if (vec[i] < 0)
			vec[i] = 0;
	}
}

template<class T>
void printPositiv(vector<T> vec) {
	for (int i = 0; i < vec.size(); i++) {
		if (vec[i] < 0) {
			vec.erase(vec.begin()+i);
			i--;
		}
			
	}
	//copy(vec.begin(), vec.end(), ostream_iterator<T>(cout, " ")); ça devrait marcher mais ça marche po
}

template<class T>
void firstLastNegatif(vector<T>& vec) {
	int iF, iL;
	int i = 0;
	while (i < vec.size() && vec[i] >= 0) {
		i++;
	}
	iF = i;
	i = vec.size()-1;
	while (i > 0 && vec[i] >= 0) {
		i--;
	}
	iL = i;
}


int main() {
	vector<int> v = { 2,-1,4,-7 };
	cout << isAllPos(v) << endl;
	firstLastNegatif(v);
	printPositiv(v);
}
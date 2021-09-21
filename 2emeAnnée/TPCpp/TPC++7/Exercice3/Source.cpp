#include <iostream>
#include <map>
#include <string>
#include <sstream>
#include <istream>
using namespace std;

string convert(string s, map<string, int> mois) {
	istringstream stream;
	string mot;
	string date;

	stream.str(s);

	getline(stream, mot, ' ');
	date += mot + '/';

	map<string, int>::iterator i = mois.begin();

	getline(stream, mot, ' ');
	while (i != mois.end()) {
		if (i->first == mot)
			date += to_string(i->second) + '/';
		i++;
	}

	getline(stream, mot, ' ');
	date += mot;
	return date;
}

int main() {
	map<string, int> mois;
	mois["janvier"] = 1;
	mois["fevrier"] = 2;
	mois["mars"] = 3;
	mois["avril"] = 4;
	mois["mai"] = 5;
	mois["juin"] = 6;
	mois["juillet"] = 7;
	mois["aout"] = 8;
	mois["septembre"] = 9;
	mois["octobre"] = 10;
	mois["novembre"] = 11;
	mois["decembre"] = 12;

	map<string, int>::iterator i = mois.begin();

	while (i != mois.end()) {
		cout << i->first << endl;
		i++;
	}

	string date = "2 novembre 2020";

	cout << convert(date, mois);
}
#include <iostream>
#include <map>
#include <fstream>
#include <string>
#include <sstream>
using namespace std;

int main() {
	map<string, string> acr;
	string mot, sign;
	bool inMap = false;
	char equal;
	string tmp;

	ifstream fichier("exo.txt", ios::beg);
	if (fichier) {
		while (getline(fichier, tmp)) {
			stringstream s(tmp);
			s >> mot;
			s >> equal;
			sign = s.str();
			sign.replace(0, mot.length() + 3, "");
			acr[mot] = sign;
		}
	}

	do {
		cout << "Saisissez un acronyme : ";
		cin >> mot;
		if (mot != "fin") {
			map<string, string>::iterator i = acr.begin();
			inMap = false;
			while (i != acr.end()) {
				if (i->first == mot) {
					inMap = true;
				}
				i++;
			}

			if (!inMap) {
				cout << "Acronyme non trouve" << endl;
				cout << "Veuillez entrer la signification de votre acronyme : ";
				getline(cin, sign);
				getline(cin, sign);
				acr[mot] = sign;
			}
			else {
				cout << mot << ':' << acr[mot] << endl;
			}
		}
	} while (mot != "fin");
}
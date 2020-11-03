#include <iostream>
#include <map>
#include <fstream>
#include <string>
#include <sstream>
using namespace std;

int main() {
	map<string, string> user;
	string name, pwd, nameTmp, pwdTmp, pwdTmp2;
	char slash;
	string tmp;
	string arg;

	ifstream fichier("exo.txt", ios::beg);
	if (fichier) {
		while (getline(fichier, tmp)) {
			stringstream s(tmp);
			s >> name;
			s >> slash;
			pwd = s.str();
			pwd.replace(0, name.length() + 3, "");
			user[name] = pwd;
		}
	}
	cout << "Voulez vous vous [co]nnecté ou vous [cr]eer un compte" << endl;
	cin >> arg;
	if (arg == "co") {
		cout << "Entrez votre identifiant : " << endl;
		cin >> nameTmp;
		for (int i = 0; i < 3; i++) {
			cout << "Entrez votre mdp : " << endl;
			cin >> pwdTmp;
			map<string, string>::iterator j = user.begin();
			while (j != user.end()) {
				if (j->first == nameTmp && j->second == pwdTmp) {
					cout << "vous etes bien connecté" << endl;
					return 0;
				}
				j++;
			}
			i++;
		}
		cout << " Vous vous etes trompé trop de fois sur votre mdp";
		return -1;
	}

	else if (arg == "cr") {
		cout << "Entrez votre identifiant : " << endl;
		cin >> nameTmp;
		bool mdpEqual = false;
		do {
			mdpEqual;
			cout << "Entrez votre mdp : " << endl;
			cin >> pwdTmp;
			cout << "confirmez votre mdp : " << endl;
			cin >> pwdTmp2;
			if (pwdTmp2 == pwdTmp)
				mdpEqual = true;
		} while (!mdpEqual);
	}
}
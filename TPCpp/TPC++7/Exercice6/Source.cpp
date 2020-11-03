
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <map>
using namespace std;

int main(void) {
	int nbr_mot = 0;
	int nbr_lettre = 0;
	int nbr_ligne = 0;
	map<char, int>mycount;
	map<string, int>wordCount;
	string ligne;
	int i = 0;


	std::ifstream Flux("exo.txt");
	while (getline(Flux, ligne))
	{
		nbr_ligne++;
		stringstream s(ligne);
		string word;
		
		while (s >> word)
		{

			i = 0;
			nbr_mot++;
			wordCount[word]++;
			while (word[i]) {
				nbr_lettre++;
				word[i] = tolower(word[i]);
				if (isalpha(word[i]))
					mycount[word[i]]++;
				i++;
			}

		}
	}


	cout << nbr_ligne << std::endl;
	cout << nbr_mot << std::endl;
	cout << nbr_lettre << std::endl;

	map<char, int>::iterator it = mycount.begin();
	while(it != mycount.end()){
		std::cout << "Nombre de fois la lettre " << it->first << " : " << it->second << std::endl;
		it++;
	}

	map<string, int>::iterator it2 = wordCount.begin();
	while (it2 != wordCount.end()) {
		std::cout << "Nombre de fois le mot " << it2->first << " : " << it2->second << std::endl;
		it2++;
	}
}
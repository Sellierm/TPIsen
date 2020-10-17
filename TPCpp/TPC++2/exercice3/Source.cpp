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

	std::string ligne;
	int i = 0;

	int tab[26] = { 0 };

	std::ifstream Flux("C:/Users/Administrateur/source/repos/TPC++2/exercice3/exercice3.txt");
	while (getline(Flux, ligne))
	{	
		nbr_ligne++;
		stringstream s(ligne);  
		string word;
		map<char, int>mycount;
		while(s >> word )
		{

			i = 0;
			nbr_mot++;
			while (word[i]) {
				nbr_lettre++;
				word[i] = tolower(word[i]);
				if (isalpha(word[i]))
					mycount[word[i] - 97]++;
				i++;
			}
			
		}
	}


	std::cout << nbr_ligne <<std::endl;
	std::cout << nbr_mot << std::endl;
	std::cout << nbr_lettre << std::endl;

	for (char i = 0; i < 26; i++) {
		std::cout << "Nombre de fois la lettre " << (char)(i + 65) << " : " << tab[i] << std::endl;
	}
}
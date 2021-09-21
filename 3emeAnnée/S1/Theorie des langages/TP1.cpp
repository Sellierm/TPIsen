#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>


using namespace std;

template<typename T>
typename T::size_type LevenshteinDistance(const T &source, const T &target) {
    if (source.size() > target.size()) {
        return LevenshteinDistance(target, source);
    }

    using TSizeType = typename T::size_type;
    const TSizeType min_size = source.size(), max_size = target.size();
    std::vector<TSizeType> lev_dist(min_size + 1);

    for (TSizeType i = 0; i <= min_size; ++i) {
        lev_dist[i] = i;
    }

    for (TSizeType j = 1; j <= max_size; ++j) {
        TSizeType previous_diagonal = lev_dist[0], previous_diagonal_save;
        ++lev_dist[0];

        for (TSizeType i = 1; i <= min_size; ++i) {
            previous_diagonal_save = lev_dist[i];
            if (source[i - 1] == target[j - 1]) {
                lev_dist[i] = previous_diagonal;
            } else {
                lev_dist[i] = std::min(std::min(lev_dist[i - 1], lev_dist[i]), previous_diagonal) + 1;
            }
            previous_diagonal = previous_diagonal_save;
        }
    }

    return lev_dist[min_size];
}

void corrector(vector<string> mots){
    string mot;
    while(mot != "end") {
        cout << "entrez un mot :" << endl;
        cin >> mot;
        vector<string> motsProches;
        bool found= false;
        for (const auto &i :mots) {
            if (LevenshteinDistance(mot, i.substr(0,i.find(','))) == 0) {
                cout << "mot correct :" << i.substr(0, i.length())<< endl;
                found = true;
                break;
            }
            else if (LevenshteinDistance(mot, i.substr(0,i.find(','))) < 3) {
                motsProches.push_back(i);
            }


        }
        if(!found){

            for(auto i:motsProches)
                cout << "mot proche: "<< i<< endl;
        }
    }
}

void prefixe(vector<string> mots){
    string mot;
    while(mot != "end") {
        cout << "entrez un mot :" << endl;
        cin >> mot;
        cout << mot<< endl;
        int n = 0;
        for (const auto &i: mots) {
            if (i.find(mot) == 0 ) {
                cout << i<< endl;
                n++;
            }
            if (n == 10)break;
        }
    }
}

void carteProba(vector<string> mots){
    int matrice[26][28] = {0};
    for(auto i:mots){
        for(auto j =0 ; j< i.substr(0,i.find(',')).length();j++) {
            if (((i[j] > 64 && i[j]< 92)|| (i[j] < 124 && i[j]> 96)) && i.substr(0,i.find(',')).length()>1) {
                if (j == i.substr(0,i.find(',')).length() -1)
                    matrice[tolower(i[j]) - 97][27]++;
                else {

                    if (j == 0) {
                        matrice[tolower(i[j]) - 97][26]++;
                    }
                    matrice[tolower(i[j+1]) - 97][tolower(i[j]) - 97]++;
                }
            }
        }
    }
    ofstream myfile;
    myfile.open ("/Users/elliott/CLionProjects/Tp1-ldp/table.csv");
    for(int i = 0;i<26;i++){
        for(int j= 0;j<27;j++){
            myfile << matrice[i][j] <<',';
        }
        myfile << matrice[i][27] <<'\n';
    }
    myfile.close();
}

int main()
{
    vector<string> mots ;
    ifstream fichier("/Users/elliott/CLionProjects/Tp1-ldp/dela-fr-public.dic");

    if(fichier)
    {

        string ligne;
        while(getline(fichier, ligne))
        {
            //if(ligne.substr(0,ligne.find(',')).find(" ")== std::string::npos) {
                mots.push_back(ligne);
            //}
            //ligne = ligne.substr(0,ligne.find(','));

        }
    }
    else
    {
        cout << "ERREUR: Impossible d'ouvrir le fichier en lecture." << endl;
    }
    //corrector(mots);
    //prefixe(mots);
    carteProba(mots);
    return 0;
}


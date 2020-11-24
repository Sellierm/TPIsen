#include <vector>
#include <iostream>
#include <string>
using namespace std;


struct My_test {
    string my_data = "Allan turing";
    template<typename T>
    bool operator()(T& elem) {
        return elem.first == my_data;
    }

};


int main(){
     vector<pair<string,string>> birthday;
     birthday.push_back(make_pair("Edsger W. Dijkstra", "11 mai 1930"));
     birthday.emplace_back("Allan Turing", "23 june 1912");
     birthday.emplace_back("Donald E. Knuth","10 january 1938");

     vector<pair<string, string>>::iterator it = std::find_if(birthday.begin(), birthday.end(),
         [&birthday](const std::pair<std::string, string>& element) { return element.first == "Allan Turing"; });
     cout << it->second << endl;
    
     vector<pair<string, string>>::iterator itr = std::find_if(birthday.begin(), birthday.end(),My_test());
     cout << it->second;


}
load("Permutation.sage")

class Cycle(Permutation):

    # constructeur
    def __init__(self, data):
        self.cycle = data
        self.data = []
        for i in [1..max(data)]:
            res = i
            for j in self.cycle:
                if i == j:
                    if i == self.cycle[-1]:
                        res = self.cycle[0]
                    else:
                        res = self.cycle[self.cycle.index(j) + 1]
            self.data.append(res)
        print(self.data)
        super().__init__(self.data)

    # affichage
    def __repr__(self):
        res = '('
        for i in self.cycle:
            res += str(i) +' ' 
        res = res[:-1] +')'
        return res


print("-= Classe Cycle chargée =-")

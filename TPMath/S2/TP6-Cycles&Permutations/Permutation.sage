class Permutation:
    
    # constructeur
    
    def __init__(self, data):
        
        if union(data) == [1..len(data)]:
            self.data = data
        else:
            raise ValueError("%s n'est pas une permutation de [1..%s]" % (data,len(data)) )
    
    # taille
    
    def __len__(self):
        
        return len(self.data)
    
    # comparaison
    
    def __eq__(self, other):
        
        return self.data == other.data
        
    def __ne__(self, other):
    
        return not self == other

    # affichage

    def __repr__(self):
        
      if len(self) < 30:
        res = matrix( [ [1..len(self)], self.data ] ).__repr__()
      else:
        res = "Permutation de [1..%s]" % len(self)
        
      return res
    
    # évaluation
    
    def __call__(self, i):
        
        if i in self.data:
            return self.data[i-1]
        else:
            return i

    # composition

    def __mul__(self, other):

        taille = max(len(self),len(other))
        res = Permutation([self(other(i)) for i in [1..taille]])
        return res
  
	# ordre
        
    def ordre(self):
        ordre = 1
        perm = self *self
        while perm != self:
            perm *=self
            ordre +=1;
        return ordre

    # liste d'inversions
    
    def inversions(self):
        list = []
        for i in [1..len(self)]:
            for j in [(i+1)..len(self)]:
                if self(i) > self(j):
                    list.append((i,j))
        return list

    # signature
    
    def sg(self):
    
        return (-1)^len(self.inversions())
        
    # décomposition cyclique

    def decomposition(self):
        res = []
        for i in [1..len(self.data)]:
            next = self(i)
            inRes = False
            for c in res:
                if i in c.cycle:
                    inRes = True
                    break
            if not inRes:
                if i != next:
                    cycle = [i]
                    while next != i:
                        cycle.append(next)
                        next = self(next)
                    res.append(Cycle(cycle))
        return res

 
    
print("-= Classe Permutation chargée =-")
print()
print("N'oubliez pas de la recharger à chaque fois que vous la modifiez !")

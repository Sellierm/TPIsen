import matplotlib.pyplot as plt
class Sandpile():

  def __init__(self, mat):

    self.mat = matrix(mat)

  def __repr__(self):

    return self.mat.__repr__()

  def __eq__(self, other):

    return self.mat == other.mat
    
  def show(self):

      M = matrix_plot(self.mat,cmap=plt.get_cmap("rainbow"), colorbar = True)
      return M
      
  def topple(self, i,j):
      if self.mat[i,j] >= 4 :
         self.mat[i,j] -= 4
         if (i +1 != self.mat.ncols()):
              self.mat[i+1,j] += 1
         if (i != 0):
              self.mat[i-1,j] += 1
              
         if (j+1 != self.mat.nrows()):
              self.mat[i,j+1] += 1
              
         if (j != 0):
              self.mat[i,j-1] += 1
              
      return self.mat
      
  def stabilize(self):
      sum = 0
      nbr = 0
      while(sum != self.mat.nrows()* self.mat.ncols()):
          sum = 0
          for i in range(0,self.mat.nrows()):
              for j in range(0,self.mat.ncols()):
                  if(self.mat[i,j] < 4):
                      sum +=1
                  else:
                      self.topple(i,j)
                      nbr +=1
      print("Il y a %d renversements" % nbr)
      return self
    
  def __add__(self,b):
      m = copy(self.mat)
      for i in range(0,self.mat.nrows()):
              for j in range(0,self.mat.ncols()):
                  m[i,j] += b.mat[i,j]
      return Sandpile(m).stabilize()
      
      
print("-= Classe Sandpile chargée =-")
print()
print("N'oubliez pas de la recharger à chaque fois que vous la modifiez !")

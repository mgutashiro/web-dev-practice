import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
import numpy as np

#constants 
h = 6.62607015e-34 # m^2*kg/s
kB = 1.380649e-23   # m^2*kg/(s^2*K) 
c = 299792458  # m/s

# temp is in Kelvin
temp1 = 3000
temp2 = 4500
temp3 = 6000

# font
inter_path = "/Users/monicautashiro-aichouri/Library/Fonts/Inter-VariableFont_opsz,wght.ttf"
inter = fm.FontProperties(fname=inter_path)
inter_tick  = fm.FontProperties(fname=inter_path, size=10)



def wien_lambda(lam, T):
    C1 = 2 * h * c**2
    C2 = h * c / kB
    return (C1 / (lam**5)) * np. exp(-C2 / (lam * T))

def rayleighJeans_lambda(lam, T):
    return ((2 * c * kB * T) / (lam**4) )

def planck_lambda(lam, T):
    C1 = 2 * h * c**2
    C2 = h * c / kB
    return (C1 / (lam**5)) * 1 / ( (np. exp(C2 / (lam * T))) - 1)

lam = np.linspace(200e-9, 2500e-9, 1200) #in meters
T = temp1
#T = temp2
#T = temp3


B_lam_Wein = wien_lambda(lam, T)
B_lam_RJ = rayleighJeans_lambda(lam, T)
B_lam_Planck = planck_lambda(lam, T)

B_lam_Wein_n = B_lam_Wein / B_lam_Wein.max()
B_lam_RJ_n = B_lam_RJ / B_lam_RJ.max()
B_lam_Planck_n = B_lam_Planck / B_lam_Planck.max()


lam_nm = lam * 1e9

plt.figure(figsize=(9.6, 7.2), dpi=100)

plt.plot(lam_nm, B_lam_Wein_n, color ='#D53032', linestyle="--")
#plt.plot(lam_nm, B_lam_RJ_n, color ='#3086E5', linestyle="-.", label = "RJ Law")
#plt.plot(lam_nm, B_lam_Planck_n, color='#184C52', linestyle="-", label="Planck (exact)", linewidth=2)

ax = plt.gca()


plt.xlabel("Wavelength λ (nm)", fontproperties=inter, fontsize=18)
plt.ylabel("Normalized spectral radiance", fontproperties=inter, fontsize = 18)
plt.xticks(fontsize=14)
plt.yticks(fontsize=14)
#plt.legend(prop=inter, fontsize = 14)

for label in ax.get_xticklabels() + ax.get_yticklabels():
    label.set_fontproperties(inter)
    label.set_fontsize(10)

# plt.legend()
plt.tight_layout()
plt.savefig("wein_T3000K_4.png", dpi=150, transparent=True)
plt.show()

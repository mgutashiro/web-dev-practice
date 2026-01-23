import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
import numpy as np
from mpl_toolkits.mplot3d import Axes3D 
from matplotlib.colors import LinearSegmentedColormap
from matplotlib.colors import PowerNorm



#constants 
h = 6.62607015e-34 # m^2*kg/s
kB = 1.380649e-23   # m^2*kg/(s^2*K) 
c = 299792458  # m/s

# temp is in Kelvin
T = np.linspace(3000, 6000, 160)  

# font
inter_path = "/Users/monicautashiro-aichouri/Library/Fonts/Inter-VariableFont_opsz,wght.ttf"
inter = fm.FontProperties(fname=inter_path, size=12)
inter_tick  = fm.FontProperties(fname=inter_path, size=10)



def wien_lambda(lam, T):
    C1 = 2 * h * c**2
    C2 = h * c / kB
    return (C1 / (lam**5)) * np. exp(-C2 / (lam * T))

heat_cmap_wein = LinearSegmentedColormap.from_list(
    "heat_red_refined",
    [
        (0.00, "#070A0F"),  # near-black
        (0.18, "#1B0A10"),  # deep maroon
        (0.35, "#4A1016"),  # wine
        (0.50, "#8E1F26"),  # dark ember
        (0.62, "#D53032"),  # YOUR red
        (0.75, "#FF5A2A"),  # hot orange-red
        (0.88, "#FFB347"),  # warm amber
        (1.00, "#FFF1D6")   # soft cream highlight
    ]
)



def rayleighJeans_lambda(lam, T):
    return ((2 * c * kB * T) / (lam**4) )

heat_cmap_rj = LinearSegmentedColormap.from_list(
    "rj_blue",
    [
        (0.00, "#070A0F"),  # near-black
        (0.20, "#0A1A2B"),  # deep navy
        (0.45, "#103A66"),  # steel blue
        (0.62, "#3086E5"),  # YOUR blue
        (0.80, "#7EC8FF"),  # airy cyan
        (1.00, "#EAF6FF")   # soft near-white
    ]
)

def planck_lambda(lam, T):
    C1 = 2 * h * c**2
    C2 = h * c / kB
    return (C1 / (lam**5)) * 1 / ( (np. exp(C2 / (lam * T))) - 1)

heat_cmap_planck = LinearSegmentedColormap.from_list(
    "planck_teal",
    [
        (0.00, "#070A0F"),  # near-black
        (0.18, "#0B1B1E"),  # deep green-black
        (0.40, "#123238"),  # dark teal
        (0.62, "#184C52"),  # YOUR teal
        (0.80, "#4DA7A6"),  # sea-glass
        (1.00, "#E7FAF8")   # pale mint-white
    ]
)


lam = np.linspace(200e-9, 2500e-9, 350) #in meters

LAM, TT = np.meshgrid(lam, T)
#B_lam_Wein = wien_lambda(LAM, TT)
#B_lam_RJ = rayleighJeans_lambda(LAM, TT)
B_lam_Planck = planck_lambda(LAM, TT)



#B_lam_Wein_n = B_lam_Wein / B_lam_Wein.max()
#B_lam_RJ_n = B_lam_RJ / B_lam_RJ.max()
B_lam_Planck_n = B_lam_Planck / B_lam_Planck.max()


lam_nm = LAM * 1e9

fig = plt.figure(figsize=(9, 6))
ax = fig.add_subplot(111, projection="3d")


#plt.plot(lam_nm, B_lam_Wein_n, color ='#D53032', linestyle="--", label="Wien approximation")
#plt.plot(lam_nm, B_lam_RJ_n, color ='#3086E5', linestyle="-.", label = "RJ Law")
#plt.plot(lam_nm, B_lam_Planck_n, color='#184C52', linestyle="-", label="Planck (exact)", linewidth=2)

norm = PowerNorm(gamma=0.5)

surf = ax.plot_surface(
    lam_nm, TT, B_lam_Planck_n,
    cmap=heat_cmap_planck,
    norm=norm,
    linewidth=0,
    antialiased=True,
    shade=True
)

ax.set_xlabel("Wavelength λ (nm)", fontproperties=inter, labelpad=10)
ax.set_ylabel("Temperature T (K)", fontproperties=inter, labelpad=10)
ax.set_zlabel("Normalized Bλ", fontproperties=inter, labelpad=10)



for axis in [ax.xaxis, ax.yaxis, ax.zaxis]:
    for tick in axis.get_ticklabels():
        tick.set_fontproperties(inter_tick)

ax.view_init(elev=25, azim=-135)

cbar = fig.colorbar(surf, shrink=0.6, aspect=18, pad=0.08)
cbar.set_label("Intensity (normalized)", fontproperties=inter)
for tick in cbar.ax.get_yticklabels():
    tick.set_fontproperties(inter_tick)

plt.tight_layout()

plt.savefig("planck_3DPlot.png", dpi=300, bbox_inches="tight", transparent=True)
plt.show()
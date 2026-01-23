# Harvard CS Project 0 

### Scratch Project Personal Notes

------


## Project Name: Blackbody Radiation: Three Laws, One Mystery

3 Scenes Overall, want to give a museum like vibe with modern style aesthetics that is clean and easy to read

- font: 
    - Title: Bebas Neue (all caps)
    - Body: Inter

- background:
    blackboard 

- color palette:

   -  Main Color
        - HEX: #F2F4F8

    - Body text (soft chalk white)
        - HEX: #D6DADF

    - Section headers / labels (science blue)
        - HEX: #5AA9E6

    - Secondary UI Accent Color:
        - HEX: #2A3440

    - Warning / failure highlight (UV catastrophe alert red)
        - HEX: #FF4D4D

    - quantum purple for the UV region (Optional)
        - HEX: #8B5CF6

level of explanation: undergraduate level

focus on Wein's approx, Rayleigh-Jeans' approach, how Planck solved this
    - show graphical representation
    - can make temperature adjustments via thermometer (animation drawn on Procreate)

-----

## Scene 1: Startup Screen



Todo for this:
- Title 
- subtitle 
- two buttons
    1. start explanation
    2. skip to demo play


## Scene 2: Explanation Screen

Flash card style:

1st Flashcard:
- Explanation of Blackbody

2nd Flashcard:
- Wein's Approx

3rd Flashcard:
- Rayleigh-Jeans Approx

4th Flash:
- Planck's resolution

Todo for this:
- portrait buttons 
- Flashcard base + Flip animation via Blender
- possible additional visul for explanation
- skip to demo button

## Scene 3: Demo Screen

Start with explanation of screen
- temperature adjustment
    - three temps (3000 K, 4500 K, 6000 K)
- historical figures buttons
- graph 

Todo for this:
- make plots on Python 
- thermometer animation via Procreate
- Explanation Button
    - to go back to beginning of scene 2
- Questionmark button 
    - go to start of scene 3 with explanation of screen



--------
## Python Plot Making Notes

1. Import Necessary Libraries
- `matplotlib.pyplot` for plotting
- `numpy` used for wavelength grid and fast vectorized math
- `matplotlib.font_manager` helps load custom font so plot looks consistent with the font from the rest of the demo

2. Define Physical Constants
- make sure units match

3. Define the three temperature being calculated. this will be used consistently across Wein, RJ (Rayleigh-Jeans), and Planck
- 3000K
- 4500K
- 6000K

4. Load and apply custom font
`inter_path=".../.../filename.ttf"
- additionally, a second font definition (`inter_tick`) was made for smaller tick labels

5. Define equations as functions 
- each radiation law is written as a function with respect to wavelength array and temperature

### Wein Approximation Equation

$$ B_λ(λ, T) = \frac{C_1}{λ^5} e^{-C_2 / (λT)} $$

in which $C_1 = 2hc^2$, $C_2 = hc / k$ and k = Boltzmann constant, c = speed of light

### Rayleigh-Jeans Law

$$ B_λ = (λ, T) = \frac {2ckT}{λ^4} $$

### Planck Law

$$ B_λ(λ, Τ) = \frac{2hc^2}{λ^5} \frac{1}{exp(\frac{hc}{λkT}) -1} $$

in which h = Planck's constant

6. Create wavelength grid
`lam = np.linspace(###, ###, ###)`
- defined the λ in meters so units cancels out properly
- range of λ was set to 200 nm -> 2500 nm
- 1200 points to give smooth curve
- converted λ back to nm for plotting

7. Choosing temperature to plot
- chose three temperature, 3000K, 4500K, 6000K
- generated total of 9 plots
- also practiced plotting 3D plots via project0_2.py

8. Compute the spectral radiance curve
- produce the raw spectral radiance values for each law at selected temperatures

9. Normalizing the curves
- since absolute intensities vary widely with temperature and between approximations,
- goal of this demo is to compare shapes, peak shifts, and where the approximation fails
    - hence normalization makes the curve comparable on same y-axis

10. Plot formatting
`plt.figure(figsize=(9.6, 7.2), dpi=100)`
- made sure to set fixed figure size to keep image consistent
- setup label, ticks, and fonts for plots
- save image for scratchs





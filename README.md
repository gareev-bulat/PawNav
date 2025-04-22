# Welcome to our iOS Mobile app - "PawNav" 👋


# Overview
The app is dedicated for the homeless animals and shelters' volunteers. 

It will be a turning point for the homeless and shelter animals, expanding the animal rescue community among the public. It will have various options, such as adopting an animal, volunteering, or donating to the shelter.  For now, we will focus on the Philadelphia area, and expand across Pennsylvania in the future.

## Get Started

1. Prerequisites

   - **Node.js** ≥ 16.x (LTS)  
   - **Yarn** or **npm**  
   - **Expo CLI**  


2. Installation

   ```bash
   git clone https://gitlab.cci.drexel.edu/cid/2425/ws1023/63/03/pawnav.git
   cd pawnav


   npm install
   #or
   yarn install
   ```
3. Add expo to the project

   npx add expo

4. Start the app

   ```bash
    npx expo start

    Run on device or simulator

   Scan the QR code in Expo Go (iOS/Android app)

   Press i to open iOS simulator

   Press a to open Android emulator
   ```

5. Project Structure

PawNav/
├── .expo/                  # Expo project settings & entry point
├── android/                # Android native code & asset manifests
├── app/                    # App source folder
│   ├── assets/             # Static assets
│   │   ├── fonts/          # Custom font files
│   │   └── images/         # Image assets
│   ├── config/             # Configuration files (e.g. navigation, Firebase)
│   │   └── firebase.js     # Firebase setup
│   └── src/                # Main application code
│       ├── components/     # Reusable UI components
│       ├── screens/        # Screen‑level components
│       ├── utilities/      # Helper functions and modules
│       └── index.js        # JS entry point (registers navigation)
├── ios/                    # iOS native code & project files
├── node_modules/           # Installed dependencies
├── scripts/                # Custom build/deploy scripts
├── .gitignore              # Git ignores
├── app.json                # Expo configuration
├── ts-expo-env.d.ts        # TypeScript definitions for Expo globals
├── metro.config.js         # Metro bundler configuration
├── package-lock.json       # NPM lockfile
├── package.json            # Project metadata & npm scripts
├── README.md               # This documentation
└── tsconfig.json           # TypeScript compiler options



# Contributors

Names:                Emails:

Bulat Gareev          bg679@drexel.edu
David Fonteneau       djf338@drexel.edu
Ethan Sarder          ers332@drexel.edu
Christian Daccarett   cdd89@drexel.edu
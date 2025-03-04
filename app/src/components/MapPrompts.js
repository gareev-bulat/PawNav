import React from 'react'

export const MapPrompts = React.createContext({
    prompts:{
        UserRegion: {},
        DestinationRegion: {}
    },
    setPrompts: () => {}
});
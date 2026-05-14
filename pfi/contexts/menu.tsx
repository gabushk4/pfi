import { createContext, ReactNode, useContext, useState } from 'react';

type MenuContextType = {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    openFrom: 'account' | 'cart' | 'products' | null;
    setOpenFrom: (from: 'account' | 'cart' | 'products' | null) => void;
}

const MenuContext = createContext<MenuContextType>({
    isMenuOpen: false,
    toggleMenu: () => {},
    openFrom: null,
    setOpenFrom: () => {}
})

export function MenuProvider({ children }: { children: ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openFrom, setOpenFrom] = useState<'account' | 'cart' | 'products' | null>(null)

    const toggleMenu = () => setIsMenuOpen(prev => !prev)

    return (
        <MenuContext.Provider value={{ isMenuOpen, toggleMenu, openFrom, setOpenFrom }}>
            {children}
        </MenuContext.Provider>
    )
}

export function useMenu() {
    const context = useContext(MenuContext)
    if (!context) throw new Error('useMenu must be used within a MenuProvider')
    return context
}
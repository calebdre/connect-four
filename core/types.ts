export type Player = {
    name: string
    color: string
}

export type GridItem = {
    position: number
    onClick: (column: number) => void
    capturedBy: Player | undefined
}

export type FilledSquare = {
    [index: number]: GridItem
}
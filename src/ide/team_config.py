"""Team and Game configurations for CQIL Mobile"""

TEAMS = {
    "NFL": {
        "COWBOYS": {"colors": [(0, 0.2, 0.4, 1), (0.7, 0.7, 0.7, 1)], "symbol": "★"},
        "EAGLES": {"colors": [(0, 0.2, 0.2, 1), (0.2, 0.5, 0.2, 1)], "symbol": "⚡"},
        "PACKERS": {"colors": [(0.2, 0.4, 0, 1), (1, 0.8, 0, 1)], "symbol": "⚜"},
        "CHIEFS": {"colors": [(0.8, 0, 0, 1), (1, 0.8, 0, 1)], "symbol": "⚔"},
    },
    "NBA": {
        "LAKERS": {"colors": [(0.5, 0.2, 0.6, 1), (1, 0.8, 0, 1)], "symbol": "☀"},
        "CELTICS": {"colors": [(0, 0.4, 0, 1), (0.8, 0.8, 0.8, 1)], "symbol": "☘"},
        "WARRIORS": {"colors": [(0, 0.2, 0.4, 1), (1, 0.8, 0, 1)], "symbol": "⚔"},
        "BULLS": {"colors": [(0.8, 0, 0, 1), (0, 0, 0, 1)], "symbol": "⚡"},
    },
    "MLB": {
        "YANKEES": {"colors": [(0, 0, 0.2, 1), (0.8, 0.8, 0.8, 1)], "symbol": "⚾"},
        "RED_SOX": {"colors": [(0.8, 0, 0, 1), (0, 0, 0.2, 1)], "symbol": "⚾"},
        "DODGERS": {"colors": [(0, 0, 0.4, 1), (0.8, 0.8, 0.8, 1)], "symbol": "⚾"},
        "CUBS": {"colors": [(0, 0, 0.8, 1), (0.8, 0, 0, 1)], "symbol": "⚾"},
    },
    "NHL": {
        "BRUINS": {"colors": [(0, 0, 0, 1), (1, 0.8, 0, 1)], "symbol": "🏒"},
        "RANGERS": {"colors": [(0, 0, 0.5, 1), (0.8, 0, 0, 1)], "symbol": "⚔"},
        "PENGUINS": {"colors": [(0, 0, 0, 1), (1, 0.8, 0, 1)], "symbol": "🏒"},
        "MAPLE_LEAFS": {"colors": [(0, 0, 0.8, 1), (0.8, 0.8, 0.8, 1)], "symbol": "🍁"},
    },
    "SOCCER": {
        "MANCHESTER": {"colors": [(0.8, 0, 0, 1), (0.1, 0.1, 0.1, 1)], "symbol": "⚽"},
        "BARCELONA": {"colors": [(0.8, 0, 0, 1), (0, 0, 0.8, 1)], "symbol": "⚽"},
        "REAL_MADRID": {"colors": [(1, 1, 1, 1), (0.2, 0.4, 0.8, 1)], "symbol": "👑"},
        "LIVERPOOL": {"colors": [(0.8, 0, 0, 1), (0.8, 0.8, 0, 1)], "symbol": "⚽"},
    },
    "RUGBY": {
        "ALL_BLACKS": {"colors": [(0, 0, 0, 1), (0.8, 0.8, 0.8, 1)], "symbol": "🏉"},
        "SPRINGBOKS": {"colors": [(0, 0.4, 0, 1), (1, 0.8, 0, 1)], "symbol": "🏉"},
        "WALLABIES": {"colors": [(1, 0.8, 0, 1), (0, 0.2, 0, 1)], "symbol": "🏉"},
        "ENGLAND": {"colors": [(1, 1, 1, 1), (0.8, 0, 0, 1)], "symbol": "🏉"},
    },
    "CRICKET": {
        "INDIA": {"colors": [(0, 0, 0.8, 1), (1, 0.6, 0, 1)], "symbol": "🏏"},
        "AUSTRALIA": {"colors": [(1, 0.8, 0, 1), (0, 0.2, 0, 1)], "symbol": "🏏"},
        "ENGLAND": {"colors": [(0, 0, 0.4, 1), (0.8, 0, 0, 1)], "symbol": "🏏"},
        "SOUTH_AFRICA": {"colors": [(0, 0.4, 0, 1), (1, 0.8, 0, 1)], "symbol": "🏏"},
    }
}

GAMES = {
    "CHESS": {
        "MOVES": ["PAWN", "KNIGHT", "BISHOP", "ROOK", "QUEEN", "KING"],
        "COLORS": [(0.3, 0.3, 0.3, 1), (0.8, 0.8, 0.8, 1)],
        "SYMBOLS": ["♟", "♞", "♝", "♜", "♛", "♚"]
    },
    "CARDS": {
        "MOVES": ["DEAL", "DRAW", "PLAY", "FOLD"],
        "COLORS": [(0.8, 0, 0, 1), (0, 0, 0, 1)],
        "SYMBOLS": ["♠", "♥", "♣", "♦"]
    },
    "GO": {
        "MOVES": ["BLACK", "WHITE", "CAPTURE", "PASS"],
        "COLORS": [(0.1, 0.1, 0.1, 1), (0.9, 0.9, 0.9, 1)],
        "SYMBOLS": ["●", "○", "⊕", "⊗"]
    },
    "DICE": {
        "MOVES": ["ROLL", "HOLD", "SCORE", "PASS"],
        "COLORS": [(0.8, 0.2, 0.2, 1), (0.2, 0.2, 0.8, 1)],
        "SYMBOLS": ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]
    }
}

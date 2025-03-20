"""Card Game UI Module"""
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.graphics import Color, Rectangle, RoundedRectangle
from kivy.animation import Animation
import random

class Card:
    SUITS = ['♠', '♥', '♦', '♣']
    RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    
    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank
        self.color = (1, 0, 0, 1) if suit in ['♥', '♦'] else (0, 0, 0, 1)
        
class CardButton(Button):
    def __init__(self, card, **kwargs):
        super().__init__(**kwargs)
        self.card = card
        self.background_normal = ''
        self.background_down = ''
        self.background_color = (0.95, 0.95, 0.95, 1)
        self.color = card.color
        self.text = f"{card.rank}\n{card.suit}"
        self.font_size = '24sp'
        self.bold = True
        
        with self.canvas.before:
            Color(0.95, 0.95, 0.95, 1)
            self.rect = RoundedRectangle(pos=self.pos, size=self.size, radius=[15])
            
        self.bind(pos=self._update_rect, size=self._update_rect)
        
    def _update_rect(self, instance, value):
        self.rect.pos = instance.pos
        self.rect.size = instance.size

class CardDeck:
    def __init__(self):
        self.reset()
        
    def reset(self):
        self.cards = [Card(suit, rank) for suit in Card.SUITS for rank in Card.RANKS]
        random.shuffle(self.cards)
        
    def draw(self):
        if not self.cards:
            self.reset()
        return self.cards.pop()

class CardGameUI(FloatLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.deck = CardDeck()
        self.hand = []
        self.table = []
        
        # Add background
        with self.canvas.before:
            Color(0.2, 0.3, 0.4, 1)
            self.bg = Rectangle(pos=self.pos, size=self.size)
        self.bind(pos=self._update_bg, size=self._update_bg)
        
        # Create UI elements
        self.hand_label = Label(
            text="Your Hand",
            font_size='24sp',
            bold=True,
            size_hint=(1, 0.1),
            pos_hint={'center_x': 0.5, 'top': 0.98},
            color=(0.9, 0.9, 1, 1)
        )
        self.add_widget(self.hand_label)
        
        self.table_label = Label(
            text="Table",
            font_size='24sp',
            bold=True,
            size_hint=(1, 0.1),
            pos_hint={'center_x': 0.5, 'top': 0.48},
            color=(0.9, 0.9, 1, 1)
        )
        self.add_widget(self.table_label)
        
        # Action buttons with style
        deal_btn = Button(
            text="Deal New Hand",
            font_size='20sp',
            bold=True,
            background_normal='',
            background_color=(0.2, 0.5, 0.8, 1),
            size_hint=(0.25, 0.1),
            pos_hint={'center_x': 0.3, 'y': 0.02}
        )
        deal_btn.bind(on_press=self.deal_hand)
        
        draw_btn = Button(
            text="Draw Card",
            font_size='20sp',
            bold=True,
            background_normal='',
            background_color=(0.2, 0.5, 0.8, 1),
            size_hint=(0.25, 0.1),
            pos_hint={'center_x': 0.7, 'y': 0.02}
        )
        draw_btn.bind(on_press=self.draw_card)
        
        self.add_widget(deal_btn)
        self.add_widget(draw_btn)
        
        # Initial deal
        self.deal_hand()
        
    def _update_bg(self, instance, value):
        self.bg.pos = instance.pos
        self.bg.size = instance.size
        
    def deal_hand(self, *args):
        # Clear current hand
        for card in self.hand:
            self.remove_widget(card)
        self.hand.clear()
        
        # Deal new cards with animation
        for i in range(5):
            card = self.deck.draw()
            card_btn = CardButton(
                card,
                size_hint=(0.12, 0.2),
                pos_hint={'center_x': 0.2 + i*0.15, 'center_y': 0.7}
            )
            card_btn.opacity = 0
            card_btn.bind(on_press=lambda btn: self.play_card(btn))
            self.hand.append(card_btn)
            self.add_widget(card_btn)
            
            anim = Animation(opacity=1, duration=0.3)
            anim.start(card_btn)
            
    def draw_card(self, *args):
        if len(self.hand) < 7:  # Limit hand size
            card = self.deck.draw()
            x_pos = 0.2 + len(self.hand)*0.15
            card_btn = CardButton(
                card,
                size_hint=(0.12, 0.2),
                pos_hint={'center_x': x_pos, 'center_y': 0.7}
            )
            card_btn.opacity = 0
            card_btn.bind(on_press=lambda btn: self.play_card(btn))
            self.hand.append(card_btn)
            self.add_widget(card_btn)
            
            anim = Animation(opacity=1, duration=0.3)
            anim.start(card_btn)
            
    def play_card(self, card_btn):
        if card_btn in self.hand:
            self.hand.remove(card_btn)
            x_pos = 0.2 + len(self.table)*0.15
            
            # Animate card to table
            anim = Animation(
                pos_hint={'center_x': x_pos, 'center_y': 0.3},
                duration=0.3
            )
            anim.start(card_btn)
            
            self.table.append(card_btn)
            
            # Rearrange hand
            for i, hand_card in enumerate(self.hand):
                anim = Animation(
                    pos_hint={'center_x': 0.2 + i*0.15, 'center_y': 0.7},
                    duration=0.3
                )
                anim.start(hand_card)

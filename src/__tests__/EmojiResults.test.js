import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Emoji Results', () => {
  let inputDOM, emojiResultsDOM;

  // Helper function to get all emoji result rows
  const loadEmojiResultsDom = () => {
    return screen.getAllByTestId('emojiResultRow');
  };

  // Helper function to type into search input
  const typeIntoInput = (string) => {
    fireEvent.change(inputDOM, { target: { value: string } });
  };

  // Helper function to click on an emoji result row
  const clickToItem = (btn) => {
    fireEvent.click(btn);
  };

  beforeEach(() => {
    // Render App component and get search input element through test id
    render(<App />);
    inputDOM = screen.getByTestId('searchInput');
  });

  // Test if the emoji results are rendered on load
  it('should be rendered', () => {
    emojiResultsDOM = loadEmojiResultsDom();
    expect(emojiResultsDOM.length).toEqual(20);
  });

  // Test if the emoji results are filtered correctly
  it('should be rendered correctly during the filtering process', () => {
    typeIntoInput('100');
    emojiResultsDOM = loadEmojiResultsDom();
    expect(emojiResultsDOM.length).toBe(1);

    typeIntoInput('gri');
    emojiResultsDOM = loadEmojiResultsDom();
    expect(emojiResultsDOM.length).toBe(4);
  });

  // Test if an emoji is copied to clipboard when clicked
  it('should copy emoji when clicked to any emoji', () => {
    const emojiResultDOM = loadEmojiResultsDom().at(0);
    clickToItem(emojiResultDOM);
    expect(
      emojiResultDOM.getAttribute('data-clipboard-text').length
    ).toBeGreaterThan(0);
  });
});

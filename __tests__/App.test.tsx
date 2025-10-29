/**
 * @format
 */
import 'react-native';
import React from 'react';

import {render, screen} from '@testing-library/react-native';
import App from '../App';

describe("App Component Test", () => {
    it('render correctly', () => {
        render(<App />);
        expect(screen.getByText('Open up App.tsx to start working on your app!')).toBeVisible();
    })
});


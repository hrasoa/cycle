// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Record<
      | 'Background'
      | 'BgNormal'
      | 'Black'
      | 'BlackHover'
      | 'Blue200'
      | 'BackgroundBlue'
      | 'BackgroundGreenLight'
      | 'BackgroundPurpleLight'
      | 'BackgroundBlueGreenLight'
      | 'Grey100'
      | 'Grey200'
      | 'Grey300'
      | 'Grey800'
      | 'Grey900'
      | 'Orange200'
      | 'TextDisabled'
      | 'TextBlue'
      | 'TextBlueGreen'
      | 'TextGreen'
      | 'TextOrange'
      | 'TextPurple'
      | 'TextSecondary'
      | 'TextPrimary'
      | 'White',
      string
    >;
    lineHeights: Record<'18x' | '20x' | '24x', string>;
    fontSizes: Record<'Headline' | 'Body' | 'Caption', string>;
    fonts: Record<'Body', string>;
    fontWeights: Record<'400' | '600', number>;
    radii: Record<'4x' | '6x' | '8x' | 'round', string>;
    space: Record<
      '2x' | '4x' | '6x' | '8x' | '12x' | '14x' | '16x' | '24x' | '32x',
      string
    >;
  }
}

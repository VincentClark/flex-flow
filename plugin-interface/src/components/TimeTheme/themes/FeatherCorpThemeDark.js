/* file: src/components/TimeTheme/FeatherCorpTheme.js */
import { withTheme } from '@twilio/flex-ui';
// brand colors

const cTangerine = 'HSL(26, 91%, 5%)';
const cTangerineLight = 'HSL(26, 91%, 23%)'; // lighter version of cTangerine
const cSolitude = 'HSL(280, 16%, 93%)';
//was 230 ^^
const lightTheme = false;


export default {
    light: lightTheme,
    baseName: 'GreyDark',

    // base theme colors
    colors: {
        tabSelectedColor: cTangerine,
        focusColor: cTangerine,
        completeTaskColor: cTangerine,
        defaultButtonColor: cTangerine,
        flexBlueColor: cTangerine
    },

    // component overrides
    overrides: {
        // top header
        MainHeader: {
            Container: {
                background: cTangerine,
                color: cSolitude
            }
        },

        // left sidebar
        SideNav: {
            Container: {
                background: cSolitude,
                color: cTangerine
            },
            Button: {
                background: cSolitude,
                color: cTangerine,
                lightHover: !lightTheme
            },
            Icon: {
                color: cTangerine
            }
        },

        // admin plugin
        FlexAdmin: {
            DashboardCard: {
                Icon: {
                    backgroundColor: cTangerineLight
                }
            }
        }

    }
};

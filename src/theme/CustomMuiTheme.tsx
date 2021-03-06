import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useAppDispatch, useAppSelector } from "src/app-redux/hooks";
// import { selectThemeType, themeTypeAction } from "src/app-redux/settings/settingsSlice";
import { selectThemeType, themeTypeAction } from "src/features/settings/settingsSlice";
import { customTheme } from "./customTheme";
// import { Theme } from "@mui/material/styles";
// declare module "@mui/styles/defaultTheme" {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
//   interface DefaultTheme extends Theme {}
// }

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

interface Props {
  children: React.ReactNode;
}
export function CustomMuiTheme(props: Props) {
  const dispatch = useDispatch();
  const goDarkState = useSelector(selectThemeType);

  const goDarkQuery = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    dispatch(themeTypeAction(null));
  }, [dispatch, goDarkQuery]);

  const theme = useMemo(
    () =>
      createTheme({
        ...customTheme,
        palette: {
          ...customTheme.palette,
          mode: "light",
        },
      }),
    [goDarkQuery, goDarkState]
  );

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </CacheProvider>
  );
}

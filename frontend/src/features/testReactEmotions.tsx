// /** @jsxImportSource @emotion/react */
// import styled from "@emotion/styled";
// import {css} from '@emotion/react';
//
//
// const ButtonCustomByArsen = styled.button`
//     background-color: ${(props) => props.color};
//     color: white;
//     font-size: 20px;
//
//     &:hover {
//         background-color: white;
//         color: red;
//     }
// `;
//
//
// const buttonSecondTestByCSSFunc = css`
//     background-color: red;
//     color: white;
//     font-size: 20px;
//
//     &:hover {
//                  background-color: white;
//                  color: red;
//     }
// `;
//
//
// const buttonSecondTestByCSSFuncTest = css`
//    text-transform: uppercase;
// `;
//
// interface Props extends React.PropsWithChildren{
//     color?: string;
//     theme: 'light' | 'dark';
// }
//
// const CustomButtonThird: React.FC<Props> = ({color, theme, children}) => {
//     return (
//         <button
//             css={css`
//                 color: ${theme === 'light' ? 'yellow' : 'blue'};
//                 background: none;
//             `}
//         >
//             {children}
//         </button>
//     )
// };
//
//
// const TestReactEmotions = () => {
//     return (
//         <div>
//             <ButtonCustomByArsen color="green">Hello</ButtonCustomByArsen>
//             <hr/>
//
//             <button css={[buttonSecondTestByCSSFunc, buttonSecondTestByCSSFuncTest]}>Test 2</button>
//
//             <CustomButtonThird theme="dark">Test 3</CustomButtonThird>
//         </div>
//     );
// };
//
// export default TestReactEmotions;
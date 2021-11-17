import styled from 'styled-components/native';

export const StyledContainer = styled.View`
    flex: 1;
    align-items: center;
    background: #cf8538;
    justify-content: center;
`;

export const InputContainer = styled.View`
    width: 80%;
`;

export const ImageLogo = styled.Image`
    width: 220;
    height: 220;
    margin-left: 52;
    margin-bottom: 20;
`;

export const StyledInput = styled.TextInput`
    background: white;
    color: black;
    padding-left: 10;
    padding-right: 10;
    padding-top: 10;
    padding-bottom: 10;
    border-radius: 10;
    margin-top: 5;
    border-color: white;
`;

export const StyledButtonContainer = styled.View`
    width: 100;
    justify-content: center;
    align-items: center;
    margin-top: 20;
`;

export const StyledButtonText = styled.Text`
    color: black;
    font-weight: 700;
    font-size: 16px;
`;

export const StyledButtonTextOutline = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16;
`;

export const StyledButton= styled.TouchableOpacity`
    width: 100%;
    padding-top: 12;
    padding-bottom: 12;
    padding-right: 12;
    padding-left: 12;
    border-radius: 10;
    align-items: center;
    background: white;
`;

export const StyledButtonOutline = styled.TouchableOpacity`
    color: white;
    font-weight: 700;
    font-size: 16;
    margin-top: 10
`;

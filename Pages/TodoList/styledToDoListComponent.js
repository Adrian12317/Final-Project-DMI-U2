import styled from 'styled-components/native';

export const StyledContainer = styled.View`
    flex: 1;
    align-items: center;
    background: #cf8538;
    justify-content: center;
`;

export const StyledAddInput = styled.TextInput`     
    background: white;
    color: black;
    padding-left: 15;
    padding-right: 15;
    padding-top: 10;
    padding-bottom: 10;
    border-radius: 10;
    margin-top: 25;
    border-color: white;
    width: 70%;
`;

export const StyledButton = styled.TouchableOpacity`
    background: #0782F9;
    width: 50%;
    padding-top: 15;
    padding-left: 15;
    padding-bottom: 15;
    padding-right: 15;
    border-radius: 10;
    align-items: center;
    margin-top: 15;
    margin-bottom: 10;
`;

export const StyledButtonText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 16;
`;

export const StyledScrollView = styled.ScrollView`
    background: #cf8538;
    margin-bottom: 20;
    margin-left: 40;
    margin-top: 40;
    margin-right: 40;
`;

export const ItemsView = styled.View`
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: row;
`;

export const StyledButtonDone = styled.Button`
    border-color: #1bf907;
    border-width: 3;
    border-radius: 100;
    margin-right: 5;
`;
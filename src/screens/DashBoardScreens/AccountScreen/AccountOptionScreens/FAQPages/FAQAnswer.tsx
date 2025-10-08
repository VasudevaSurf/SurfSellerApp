import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Linking,
    StyleSheet,
} from 'react-native';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import ChatIcon from '../../../../../assets/icons/ChatIcon';
import { Header } from '../../../../../components/UserComponents/Header/Header';
import { Typography } from '../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../config/colorPalette';
import { getScreenHeight, getScreenWidth } from '../../../../../helpers/screenSize';
import { goBack, navigate } from '../../../../../navigation/utils/navigationRef';
import { BadgeType, BadgeVariant } from '../../../../../components/UserComponents/Badges/Badge.types';
import { Spacing } from '../../../../../config/globalStyles';
import { faqData } from './FAQScreen';

// A helper to find the specific FAQ data by ID
export const getFaqAnswerById = (id) => faqData.find((item) => item.id === id);

const FAQAnswer = ({ route }) => {
    const { questionId } = route.params;
    const faqItem = getFaqAnswerById(questionId);

    if (!faqItem) {
        return (
            <SafeAreaView style={styles.container}>
                <Typography text="FAQ not found." customTextStyles={styles.errorText} variant={TypographyVariant.PSMALL_REGULAR} />
            </SafeAreaView>
        );
    }

    const { question, answer } = faqItem;

    const handleChat = () => {
        navigate('Dashboard', {
            screen: 'Account',
            params: { screen: 'ChatScreen' },
        });
    };

    const renderText = (text, customStyles = {}) => {
        const parts = text.split('**');
        return parts.map((part, index) =>
            index % 2 === 1 ? (
                <Typography key={index} customTextStyles={[styles.boldText, customStyles]} text={part} variant={TypographyVariant.PSMALL_REGULAR} />
            ) : (
                <Typography key={index} customTextStyles={customStyles} text={part} variant={TypographyVariant.PSMALL_REGULAR} />
            )
        );
    };

    const renderContent = (section, index) => {
        switch (section.type) {
            case 'text':
                return (
                    <View key={index}>
                        {section.title && <Typography text={section.title} variant={TypographyVariant.LMEDIUM_BOLD} customTextStyles={styles.sectionTitle} />}
                        <Typography variant={TypographyVariant.PSMALL_REGULAR} customTextStyles={styles.sectionContent}>{renderText(section.content)}</Typography>
                    </View>
                );
            case 'sub_question':
                return (
                    <View key={index}>
                        <Typography text={section.title} variant={TypographyVariant.LMEDIUM_BOLD} customTextStyles={styles.sectionTitle} />
                        <Typography text={section.content} variant={TypographyVariant.PSMALL_REGULAR} customTextStyles={styles.sectionContent} />
                    </View>
                );
            case 'bullet_list':
                return (
                    <View key={index} style={styles.listContainer}>
                        {section.items.map((item, itemIndex) => (
                            <View key={itemIndex} style={styles.listItem}>
                                <Typography text="• " variant={TypographyVariant.PSMALL_REGULAR} customTextStyles={styles.bulletPoint} />
                                <View style={{ flex: 1 }}>
                                    <Typography variant={TypographyVariant.PSMALL_REGULAR}>
                                        {item.title && <Typography text={item.title + ' '} variant={TypographyVariant.PSMALL_BOLD} customTextStyles={styles.listItemTitle} />}
                                        <Typography text={item.content || item} variant={TypographyVariant.PSMALL_REGULAR} />
                                    </Typography>
                                </View>
                            </View>
                        ))}
                    </View>
                );
            case 'link':
                return (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(section.url)} style={styles.linkContainer}>
                        <Typography text={section.text} customTextStyles={styles.linkText} variant={TypographyVariant.PSMALL_REGULAR} />
                    </TouchableOpacity>
                );
            case 'text_with_inline_link':
                const parts = section.content.split('%LINK%');
                return (
                    <View key={index}>
                        <Typography variant={TypographyVariant.PSMALL_REGULAR} customTextStyles={styles.sectionContent}>
                            <Typography text={parts[0]} variant={TypographyVariant.PSMALL_REGULAR} />
                            <Typography text={section.linkText} onPress={() => Linking.openURL(section.url)} customTextStyles={styles.inlineLinkText} variant={TypographyVariant.PSMALL_REGULAR} />
                            <Typography text={parts[1]} variant={TypographyVariant.PSMALL_REGULAR} />
                        </Typography>
                    </View>
                );
            case 'group':
                return (
                    <>
                        {section.content.map((groupedItem, groupedIndex) => renderContent(groupedItem, groupedIndex))}
                    </>
                );
            default:
                return null;
        }
    };

    const renderAnswer = () => {
        // Special rendering for the first FAQ (Question 1)
        if (questionId === 1) {
            return (
                <>
                    {/* First content block as a separate card */}
                    <View style={styles.card}>
                        <Typography text={question} variant={TypographyVariant.LMEDIUM_BOLD} customTextStyles={styles.questionTitle} />
                        {renderContent(answer[0], 0)}
                    </View>

                    {/* The grouped sub-sections as another separate card */}
                    <View style={styles.card}>
                        {renderContent(answer[1], 1)}
                    </View>
                </>
            );
        }

        // General rendering for all other FAQs
        return (
            <View style={styles.card}>
                <Typography text={question} variant={TypographyVariant.LMEDIUM_BOLD} customTextStyles={styles.questionTitle} />
                {answer.map((section, index) => (
                    <View key={index}>
                        {renderContent(section, index)}
                    </View>
                ))}            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <Header
                leftIcon={<ArrowLeft size={22} onPress={goBack} />}
                rightIcons={[
                    {
                        isBadge: true,
                        text: 'Chat With Us',
                        badgeType: BadgeType.PRIMARY,
                        badgeVariant: BadgeVariant.FILLED,
                        onPress: handleChat,
                        customContainerStyle: {
                            borderRadius: Spacing.Small,
                            paddingVertical: getScreenHeight(1.2),
                            paddingHorizontal: getScreenWidth(3),
                            shadowColor: '#101828',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.08,
                            shadowRadius: 15,
                            elevation: 6,
                        },
                        textVariant: TypographyVariant.PMEDIUM_SEMIBOLD,
                        leftIcon: ChatIcon,
                        iconSize: 24,
                    },
                ]}
            />
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {renderAnswer()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalette.SearchBack,
    },
    mainContainer: { flex: 1 },
    scrollContent: { paddingBottom: getScreenHeight(4) },
    card: {
        backgroundColor: ColorPalette.White,
        marginTop: getScreenHeight(1),
        paddingHorizontal: getScreenWidth(4),
        paddingVertical: getScreenHeight(2),
    },
    questionTitle: {
        marginBottom: getScreenHeight(1.5),

        lineHeight: 24
    },
    sectionTitle: {
        marginBottom: 8,
    },
    sectionContent: {
        lineHeight: 20,
        marginBottom: getScreenHeight(1),
    },
    boldText: { fontWeight: '600' },
    listContainer: {
        marginTop: getScreenHeight(1),
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: getScreenHeight(0.8),
    },
    bulletPoint: { marginRight: 6 },
    listItemTitle: { fontWeight: '600' },
    linkContainer: { marginTop: getScreenHeight(1.8) },
    linkText: { color: ColorPalette.ProgressLine, textDecorationLine: 'underline' },
    inlineLinkText: { color: ColorPalette.ProgressLine, textDecorationLine: 'underline' },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default FAQAnswer;
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';

interface Step {
  id: number;
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepPress?: (stepId: number) => void;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  onStepPress,
}) => {
  const handleStepPress = (stepId: number) => {
    if (onStepPress) {
      onStepPress(stepId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.connectorContainer}>
        {steps.map((step, index) => {
          if (index < steps.length - 1) {
            const isActive = step.id < currentStep;
            return (
              <View
                key={`connector-${index}`}
                style={[
                  styles.connector,
                  isActive ? styles.activeConnector : styles.inactiveConnector,
                ]}
              />
            );
          }
          return null;
        })}
      </View>

      {steps.map(step => {
        const isPassed = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        const isActive = isPassed || isCurrent;

        return (
          <TouchableOpacity
            key={step.id}
            style={styles.stepContainer}
            onPress={() => handleStepPress(step.id)}
            activeOpacity={0.7}>
            <View style={styles.circleWrapper}>
              {isCurrent && <View style={styles.haloEffect} />}
              <View
                style={[
                  styles.circle,
                  isPassed
                    ? styles.passedCircle
                    : isActive
                    ? styles.activeCircle
                    : styles.inactiveCircle,
                ]}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_BOLD}
                  text={String(step.id).padStart(2, '0')}
                  customTextStyles={[
                    styles.stepNumber,
                    isPassed
                      ? styles.passedStepNumber
                      : isActive
                      ? styles.activeStepNumber
                      : styles.inactiveStepNumber,
                  ]}
                />
              </View>
            </View>

            <Typography
              variant={TypographyVariant.LMEDIUM_SEMIBOLD}
              text={step.label}
              customTextStyles={[
                styles.stepLabel,
                isActive ? styles.activeStepLabel : styles.inactiveStepLabel,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.White,
    position: 'relative',
  },
  connectorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: getScreenHeight(4.5),
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(12.5),
  },
  connector: {
    height: getScreenHeight(0.25),
    flex: 1,
    marginHorizontal: getScreenWidth(1),
  },
  activeConnector: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderColor: ColorPalette.PURPLE_300,
  },
  inactiveConnector: {
    backgroundColor: ColorPalette.ConnectLine,
  },
  stepContainer: {
    alignItems: 'center',
    zIndex: 2,
    flex: 1,
    display: 'flex',
    gap: getScreenWidth(2),
  },
  circleWrapper: {
    position: 'relative',
    width: getScreenWidth(13),
    height: getScreenWidth(13),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getScreenHeight(0.5),
  },
  haloEffect: {
    position: 'absolute',
    width: getScreenWidth(11),
    height: getScreenWidth(11),
    borderRadius: getScreenWidth(6.5),
    backgroundColor: 'rgba(58, 90, 254, 0.12)',
  },
  circle: {
    width: getScreenWidth(8),
    height: getScreenWidth(8),
    borderRadius: getScreenWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  activeCircle: {
    backgroundColor: ColorPalette.White,
    borderWidth: 3,
    borderColor: ColorPalette.PURPLE_300,
  },
  passedCircle: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderWidth: 1.5,
    borderColor: ColorPalette.PURPLE_300,
  },
  inactiveCircle: {
    backgroundColor: ColorPalette.SearchBack,
    borderWidth: 3,
    borderColor: ColorPalette.ConnectLine,
  },
  activeStepNumber: {
    color: ColorPalette.PURPLE_300,
  },
  passedStepNumber: {
    color: ColorPalette.White,
  },
  inactiveStepNumber: {
    color: ColorPalette.GREY_TEXT_200,
  },
  stepLabel: {
    textAlign: 'center',
    flexShrink: 1,
    maxWidth: getScreenWidth(20),
  },
  activeStepLabel: {
    color: ColorPalette.LabelColor,
  },
  inactiveStepLabel: {
    color: ColorPalette.InactiveLabelColor,
  },
});

export default ProgressStepper;

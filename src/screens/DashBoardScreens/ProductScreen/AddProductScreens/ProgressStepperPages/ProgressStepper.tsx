import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../config/globalStyles';

interface Step {
  id: number;
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
}) => {
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
          <View key={step.id} style={styles.stepContainer}>
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
          </View>
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
    top: getScreenHeight(3.5),
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
  circle: {
    width: getScreenWidth(8),
    height: getScreenWidth(8),
    borderRadius: getScreenWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getScreenHeight(0.5),
  },
  activeCircle: {
    backgroundColor: ColorPalette.White,
    borderWidth: 1.5,
    borderColor: ColorPalette.PURPLE_300,
  },
  passedCircle: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderWidth: 1.5,
    borderColor: ColorPalette.PURPLE_300,
  },
  inactiveCircle: {
    backgroundColor: ColorPalette.White,
    borderWidth: 1.5,
    borderColor: ColorPalette.ConnectLine,
  },
  activeStepNumber: {
    color: ColorPalette.PURPLE_300,
  },
  passedStepNumber: {
    color: ColorPalette.White,
  },
  inactiveStepNumber: {
    color: ColorPalette.ConnectLine,
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

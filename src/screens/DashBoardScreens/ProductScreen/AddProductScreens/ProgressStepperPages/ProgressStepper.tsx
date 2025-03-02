import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {getFigmaDimension} from '../../../../../helpers/screenSize';

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: ColorPalette.White,
    position: 'relative',
  },
  connectorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 27,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  connector: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
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
    gap: getFigmaDimension(8),
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
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
  },
  activeStepLabel: {
    color: ColorPalette.LabelColor,
  },
  inactiveStepLabel: {
    color: ColorPalette.InactiveLabelColor,
  },
});

export default ProgressStepper;

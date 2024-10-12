import healthDataService from '@/services/healthDataService'
import { ValidationError } from '@/utils/validationUtils'

class HealthDataController {
  async createdHealthData(req, res, next) {
    try {
      const { userId, weight, height, bloodPressure, heartRate } = req.body

      if (!userId || !weight || !height || !bloodPressure || !heartRate) {
        throw new ValidationError('Missing required fields')
      }

      const newHealthData = await healthDataService.createdHealthData({
        userId,
        weight,
        height,
        bloodPressure,
        heartRate,
      })

      return res.status(201).json({
        success: true,
        data: newHealthData,
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserHealthData(req, res, next) {
    try {
      const { userId } = req.params

      if (!userId) {
        throw new ValidationError('User ID is Required.')
      }

      const healthDataRecords =
        await healthDataService.getUserHealthData(userId)

      return res.status(200).json({
        success: true,
        data: healthDataRecords,
      })
    } catch (error) {
      next(error)
    }
  }

  async updateHealthData(req, res, next) {
    try {
      const { healthDataId } = req.params
      const { weight, height, bloodPressure, heartRate } = req.body

      if (!healthDataId) {
        throw new ValidationError('Health data ID is required')
      }

      if (!weight || !height || !bloodPressure || !heartRate) {
        throw new ValidationError(
          'Missing required fields for update: weight, height, bloodPressure, or heartRate',
        )
      }

      const updatedHealthData = await healthDataService.updateHealthData(
        healthDataId,
        {
          weight,
          height,
          bloodPressure,
          heartRate,
        },
      )

      return res.status(200).json({
        success: true,
        data: updatedHealthData,
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteHealthData(req, res, next) {
    try {
      const { healthDataId } = req.params

      if (!healthDataId) {
        throw new ValidationError('Health data ID is required')
      }

      await healthDataService.deleteHealthData(healthDataId)

      return res.status(200).json({
        success: true,
        message: 'Health data record deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  async getHealthDataById(req, res, next) {
    try {
      const { healthDataId } = req.params

      if (!healthDataId) {
        throw new ValidationError('Health data ID is required')
      }

      const healthData = await healthDataService.getHealthDataById(healthDataId)

      return res.status(200).json({
        success: true,
        data: healthData,
      })
    } catch (error) {
      next(error)
    }
  }

  async getHealthMetrics(req, res, next) {
    try {
      const { userId } = req.params

      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      const healthMetrics =
        await healthDataService.calculateHealthMetrics(userId)

      return res.status(200).json({
        success: true,
        data: healthMetrics,
      })
    } catch (error) {
      next(error)
    }
  }

  async getHealthTrends(req, res, next) {
    try {
      const { userId } = req.params

      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      const trends = await healthDataService.getHealthTrends(userId)

      return res.status(200).json({
        success: true,
        data: trends,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new HealthDataController()

/**
 * Numeric validation operator labels.
 * @type {Object.<string, string>}
 */
const NUMERIC_OPERATORS =
          {
              'greater':        'Greater than',
              'greaterorequal': 'Greater than or equal to',
              'less':           'Less than',
              'lessorequal':    'Less than or equal to',
              'equal':          'Equal to',
              'notequal':       'Not equal to',
              'between':        'Between',
              'notbetween':     'Not between'
          };

/**
 * Date and time validation operator labels.
 * @type {Object.<string, string>}
 */
const DATE_TIME_OPERATORS =
          {
              'greater':        'After',
              'greaterorequal': 'On or after',
              'less':           'Before',
              'lessorequal':    'On or before',
              'equal':          'On',
              'notequal':       'Not on',
              'between':        'Between',
              'notbetween':     'Not between'
          };

/**
 * Sets the visibility of a jQuery element.
 * @param {jQuery} jQueryElement - The jQuery element to show or hide.
 * @param {boolean} visible - Whether the element should be visible.
 */
function setVisible(jQueryElement, visible)
{
    // Iterate over each element in the jQuery object and set is visibility and enabled state
    // based on the visible parameter.
    $j(jQueryElement)
        .each(function ()
              {
                  if (visible)
                  {
                      if ($j(this).hasClass('hide'))
                      {
                          $j(this).removeClass('hide');
                      }

                      $j(this).prop('disabled', false);
                  }
                  else
                  {
                      if (!$j(this).hasClass('hide'))
                      {
                          $j(this).addClass('hide');
                      }

                      $j(this).prop('disabled', true);
                  }
              });
}

/**
 * Copies the time value from the source element to the target element.
 * Converts the time format so it matches its destination.
 * @param {jQuery} target - The target jQuery element.
 * @param {jQuery} source - The source jQuery element.
 */
function copyTimeValue(target, source)
{
    if (target.attr('id').includes('Store'))
    {
        // Convert the time to seconds past midnight for storing in the database
        target.val(convertToSeconds(source.val()));
    }
    else
    {
        // Convert the time to 12-hour format for display
        target.val(convertTo12hrTime(source.val()));
    }
}

/**
 * Converts seconds past midnight to 12-hour time format (AM/PM).
 * Adapted from Peter Nethercott's Log Entry Management Plugin.
 * @param {number} seconds - The number of seconds.
 * @returns {string} The time in 12-hour format.
 */
function convertTo12hrTime(seconds)
{
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let meridiem = 'AM';

    // Set the meridiem and adjust the hours if necessary
    if (hours * 60 * 60 >= 43200)
    {
        meridiem = 'PM';

        if (hours !== 12)
        {
            hours -= 12;
        }
    }

    // Add leading zeros to the hours and minutes if necessary
    let strHours = hours < 10 ? `0${hours}` : `${hours}`;
    let strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Return the formatted time
    return `${strHours}:${strMinutes} ${meridiem}`;
}

// Convert Time (12 hr AM/PM) to seconds past midnight (integer)
// Adapted from Peter Nethercott's Log Entry Management Plugin
/**
 * Converts 12-hour time format (AM/PM) to seconds.
 * Adapted from Peter Nethercott's Log Entry Management Plugin.
 * @param {string} time12Hrs - The time in 12-hour format.
 * @returns {number} The number of seconds.
 */
function convertToSeconds(time12Hrs)
{
    // Extract the hours and minutes from the time string
    let hrs = parseInt(time12Hrs.substring(0, 2), 10);
    let min = parseInt(time12Hrs.substring(3, 5), 10);

    // Return the number of seconds past midnight, adjusting for PM if necessary
    return hrs * 3600 + min * 60 +
           ((time12Hrs.substring(6) === "PM" && hrs !== 12) ? 43200 : 0);
}
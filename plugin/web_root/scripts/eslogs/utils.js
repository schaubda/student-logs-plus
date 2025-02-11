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

function setVisible(jQueryElement, visible)
{
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

function copyTimeValue(target, source)
{
    if (target.attr('id').includes('Store'))
    {
        target.val(convertToSeconds(source.val()));
    }
    else
    {
        target.val(convertTo12hrTime(source.val()));
    }
}

// Convert Seconds (integer) to Time (12 hr AM/PM) -- no seconds
// Adapted from Peter Nethercott's Log Entry Management Plugin
function convertTo12hrTime(seconds)
{
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let meridiem = 'AM';

    if (hours * 60 * 60 >= 43200)
    {
        meridiem = 'PM';

        if (hours !== 12)
        {
            hours -= 12;
        }
    }

    let strHours = hours < 10 ? `0${hours}` : `${hours}`;
    let strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${strHours}:${strMinutes} ${meridiem}`;
}

// Convert Time (12 hr AM/PM) to Seconds (integer)
// Adapted from Peter Nethercott's Log Entry Management Plugin
function convertToSeconds(time12Hrs)
{
    let hrs = parseInt(time12Hrs.substring(0, 2), 10);
    let min = parseInt(time12Hrs.substring(3, 5), 10);

    return hrs * 3600 + min * 60 +
           ((time12Hrs.substring(6) === "PM" && hrs !== 12) ? 43200 : 0);
}